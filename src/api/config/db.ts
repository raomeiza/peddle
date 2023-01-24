const mongoose = require('mongoose');
const logger = require('../utils/logger');
const throwError = require('../utils/handle-error');

const InitiateDB = async () => {
  const { DATABASE_URL } = require('./index');
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(DATABASE_URL, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
      // set database name to match the database name in the mongodb
      dbName: 'express_typescript_skeleton',
    });
    logger.info('Connected to DB');
  } catch (ex:any) {
    logger.log({
      level: 'error',
      message: ex.message,
    });
    process.exit(1);
  }
};

export default InitiateMongoServer;
