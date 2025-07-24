const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config(); // Load .env variables

const fetchDeliveryList = async (req, res) => {
  const customerId = req.params.customerId.padStart(10, '0');

  const soapUrl = process.env.SAP_DELIVERY_URL;

  const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZFM_DELIVERYLIST>
          <CUSTOMER_ID>${customerId}</CUSTOMER_ID>
        </urn:ZFM_DELIVERYLIST>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(soapUrl, soapRequest, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': '',
        Authorization:
          'Basic ' +
          Buffer.from(`${process.env.SAP_USERNAME}:${process.env.SAP_PASSWORD}`).toString('base64'),
      },
    });

    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('XML Parse Error:', err);
        return res.status(500).json({ error: 'Error parsing SOAP response' });
      }

      const items =
        result['soap-env:Envelope']['soap-env:Body']?.['n0:ZFM_DELIVERYLISTResponse']?.RESULT?.item;

      if (!items) {
        return res.status(404).json({ message: 'No delivery data found' });
      }

      const deliveryData = Array.isArray(items) ? items : [items];
      res.json(deliveryData);
    });
  } catch (error) {
    console.error('SOAP Request Error:', error.message);
    res.status(500).json({ error: 'SOAP request failed' });
  }
};

module.exports = { fetchDeliveryList };
