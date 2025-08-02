const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { parseStringPromise } = require('xml2js');
require('dotenv').config();

const invoicesDir = path.join(__dirname, '../invoices');
if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir);

exports.fetchAndSaveInvoices = async (req, res) => {
  const customerId = req.params.customerId;

  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZFM_INVOICEDETAILS>
          <CUSTOMER_ID>${customerId}</CUSTOMER_ID>
        </urn:ZFM_INVOICEDETAILS>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(
      process.env.SOAP_URL,
      soapEnvelope,
      {
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
        },
        auth: {
          username: process.env.SAP_USERNAME,
          password: process.env.SAP_PASSWORD,
        }
      }
    );

    const result = await parseStringPromise(response.data, { explicitArray: false });

    const items = result['soap-env:Envelope']['soap-env:Body']
                   ['n0:ZFM_INVOICEDETAILSResponse']
                   ['RESULT']['item'];

    const allInvoices = Array.isArray(items) ? items : [items];
    const savedInvoices = [];

    // 🔴 Delete all old invoice PDFs before saving new ones
    fs.readdirSync(invoicesDir).forEach(file => {
      const filePath = path.join(invoicesDir, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });

    allInvoices.forEach((invoice) => {
      const base64Data = invoice.R_PDF_BASE64;
      const invoiceNumber = invoice.R_INVOICE_NUMBER;
      const filename = `Invoice_${invoiceNumber}.pdf`;
      const filePath = path.join(invoicesDir, filename);

      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      savedInvoices.push({
        invoiceNumber: invoice.R_INVOICE_NUMBER,
        invoiceDate: invoice.R_INVOICE_DATE,
        customerId: invoice.R_CUSTOMER_ID,
        salesOrg: invoice.R_SALESORGANIZATION,
        item: invoice.R_ITEM,
        amount: invoice.R_AMOUNT,
        currency: invoice.R_CURRENCY,
        file: filename,
        status: 'newly saved'
      });
    });

    res.status(200).json({
      message: 'Invoices cleaned and saved successfully',
      count: savedInvoices.length,
      invoices: savedInvoices
    });

  } catch (error) {
    console.error('SOAP Fetch Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch invoice data' });
  }
};
