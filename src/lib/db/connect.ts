import mongoose from 'mongoose';
import { DB_NAME, MONGODB_URI } from '../constants';

export default async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }

    if (!MONGODB_URI) {
      console.log('MONGODB_URI is not defined in environment variables');
    }

    if (!MONGODB_URI!.startsWith('mongodb://') && !MONGODB_URI!.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB connection string format');
    }

    const dbConnection = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}` || `mongodb://localhost:27017/${DB_NAME}`
    );
    if (dbConnection) {
      console.log('DB connected successfully.');
    }
    console.log(dbConnection.connection.host);

    return mongoose;
  } catch (error) {
    throw new Error(`Error occurred while connecting database: ${error}`);
    process.exit(1);
  }
}
