const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();

const fetchSalesOrderData = async (req, res) => {
  const customerId = req.params.customerId.padStart(10, '0');

  const soapRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:urn="urn:sap-com:document:sap:rfc:functions">
     <soapenv:Header/>
     <soapenv:Body>
        <urn:ZFM_SALESORDERDATA>
           <CUSTOMER_ID>${customerId}</CUSTOMER_ID>
        </urn:ZFM_SALESORDERDATA>
     </soapenv:Body>
  </soapenv:Envelope>`;

  try {
    const response = await axios.post(process.env.SOAP_URL, soapRequest, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'urn:sap-com:document:sap:rfc:functions:ZFM_SALESORDERDATA'
      },
      auth: {
        username: process.env.SOAP_USERNAME,
        password: process.env.SOAP_PASSWORD
      }
    });

    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to parse XML' });
      }

      const items =
        result['soap-env:Envelope']?.['soap-env:Body']?.['n0:ZFM_SALESORDERDATAResponse']?.RESULT?.item;

      res.json(Array.isArray(items) ? items : [items]);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchSalesOrderData };
