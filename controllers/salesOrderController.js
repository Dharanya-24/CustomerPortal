const axios = require('axios');
const { parseStringPromise } = require('xml2js');
require('dotenv').config();

exports.getSalesOrderData = async (req, res) => {
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
    const response = await axios.post(
      process.env.SAP_SALESORDER_URL,
      soapRequest,
      {
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': 'urn:sap-com:document:sap:rfc:functions:ZFM_SALESORDERDATA',
        },
        auth: {
          username: process.env.SAP_USERNAME,
          password: process.env.SAP_PASSWORD,
        },
      }
    );

    const result = await parseStringPromise(response.data, { explicitArray: false });
    const items = result['soap-env:Envelope']['soap-env:Body']['n0:ZFM_SALESORDERDATAResponse']['RESULT']['item'];

    res.json(Array.isArray(items) ? items : [items]);

  } catch (error) {
    console.error('SOAP Request Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch sales order data' });
  }
};
