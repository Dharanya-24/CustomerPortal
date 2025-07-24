const axios = require('axios');
const { parseStringPromise } = require('xml2js');

const getCustomerProfile = async (req, res) => {
  const { userId } = req.query;

  const xml = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:z="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
      <z:ZFM_CUSTOMERPROFILE>
        <USER_ID>${userId}</USER_ID>
      </z:ZFM_CUSTOMERPROFILE>
    </soapenv:Body>
  </soapenv:Envelope>`;

  try {
    const response = await axios.post(
      process.env.SOAP_ENDPOINT,
      xml,
      {
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': '',
        },
        auth: {
          username: process.env.SOAP_USER,
          password: process.env.SOAP_PASS
        }
      }
    );

    const parsed = await parseStringPromise(response.data, { explicitArray: false });

    const body = parsed['soap-env:Envelope']['soap-env:Body'];
    const profile = body['n0:ZFM_CUSTOMERPROFILEResponse'];

    res.json({
      customerId: profile.CUSTOMER_ID,
      name: profile.CUSTOMER_NAME,
      city: profile.CITY,
      postalCode: profile.POSTAL_CODE,
      country: profile.COUNTRY,
      group: profile.CUSTOMER_GROUP,
      phone: profile.PHONE,
      region: profile.REGION,
      street: profile.STREET
    });

  } catch (err) {
    console.error('SOAP Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch customer profile' });
  }
};

module.exports = { getCustomerProfile };
