const express = require('express');
const app = require('./app');
const { connectDatabase, syncDatabase } = require('./config/database');
const { setupAdmin } = require('./config/adminjs');
const { bootstrapAppData } = require('./services/bootstrap.service');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');
const apiRoutes = require('./routes');
require('./models');

const port = process.env.PORT || 5000;

async function startServer() {
  await connectDatabase();
  await syncDatabase();
  await bootstrapAppData();
  await setupAdmin(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
