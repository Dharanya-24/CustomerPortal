const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();

const fetchInquiryData = async (req, res) => {
  try {
    const customerId = req.params.customerId.padStart(10, '0');

    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:ZFM_CUSTOMERINQUIRY>
            <CUSTOMER_ID>${customerId}</CUSTOMER_ID>
          </urn:ZFM_CUSTOMERINQUIRY>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const response = await axios.post(process.env.SOAP_INQUIRY_URL, soapEnvelope, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'urn:sap-com:document:sap:rfc:functions:ZFM_CUSTOMERINQUIRY'
      },
      auth: {
        username: process.env.SAP_USERNAME,
        password: process.env.SAP_PASSWORD
      }
    });

    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error parsing response', error: err });

      try {
        const items =
          result['soap-env:Envelope']['soap-env:Body']
            ['n0:ZFM_CUSTOMERINQUIRYResponse']
            ['RESULT']['item'];

        const data = Array.isArray(items) ? items : [items];
        res.json(data);
      } catch (parseErr) {
        res.status(500).json({ message: 'Invalid SOAP structure', error: parseErr });
      }
    });
  } catch (error) {
    console.error('SOAP Error:', error);
    res.status(500).json({ message: 'Failed to fetch inquiry data', error });
  }
};

module.exports = { fetchInquiryData };
