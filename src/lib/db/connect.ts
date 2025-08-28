import mongoose from 'mongoose';

export default async function connectDB() {
  if (mongoose.connection?.readyState === 1) return;
  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI is not defined in environment variables');
  }

  if (
    !process.env.MONGODB_URI!.startsWith('mongodb://') &&
    !process.env.MONGODB_URI!.startsWith('mongodb+srv://')
  ) {
    throw new Error('Invalid MongoDB connection string format');
  }
  try {
    const dbConnection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}` ||
        `mongodb://localhost:27017/mzeeshankhan`
    );
    if (dbConnection) {
      console.log('DB connected successfully.');
    }

    console.log('Connection host', dbConnection.connection.host);

    return dbConnection;
  } catch (error) {
    console.log(`Error occurred while connecting database: ${error}`);
    process.exit(1);
  }
}
