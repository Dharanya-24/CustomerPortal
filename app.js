const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());

const loginRoute = require('./routes/loginRoute');
app.use('/api', loginRoute);

const profileRoute = require('./routes/profileRoute');
app.use('/api', profileRoute);

const inquiryRoute = require('./routes/inquiryRoute');
app.use('/api/inquiry', inquiryRoute);

const salesOrderRoute = require('./routes/salesOrderRoute');
app.use('/api/sales-order', salesOrderRoute);

const deliveryRoute = require('./routes/deliveryRoute');
app.use('/api/delivery', deliveryRoute);

const invoiceRoutes = require('./routes/invoiceRoute');
app.use('/api', invoiceRoutes);

// Serve static files if needed
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
