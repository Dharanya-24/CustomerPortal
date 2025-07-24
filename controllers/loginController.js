require('dotenv').config();
const axios = require('axios');

exports.loginCustomer = async (req, res) => {
  const { userId, password } = req.query;

  if (!userId || !password) {
    return res.status(400).json({ error: 'Missing userId or password' });
  }

  const url = `${process.env.SAP_GATEWAY}/sap/opu/odata/SAP/Z_CUSTOMER_PORTAL_SRV/CustomerloginSet(UserId='${userId}',Password='${password}')`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: process.env.SAP_USERNAME,
        password: process.env.SAP_PASSWORD
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    const result = response.data.d;
    return res.status(200).json({
      message: result.Result,
      userId: result.UserId
    });

  } catch (err) {
    console.error('SAP Error:', err.message);
    return res.status(500).json({ error: 'SAP Login Failed' });
  }
};
