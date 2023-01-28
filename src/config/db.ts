import mongoose from 'mongoose';
import logger from '../api/utils/logger'
import { DATABASE_URL } from '.';

mongoose.set('strictQuery', true);
const InitiateDB = async () => {
  try {
    // @ts-ignore
    mongoose.connect(DATABASE_URL, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.log({
      level: 'info',
      message: 'Database connection successful',
    });
  } catch (ex:any) {
    logger.log({
      level: 'error',
      message: ex.message,
    });
    process.exit(1);
  }
};

export default InitiateDB;
