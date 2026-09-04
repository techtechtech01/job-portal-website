import mongoose from "mongoose";

const connectDB = async () => {
  try {
    
    console.log("Connection URI ");
    
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URI
    );
    
    console.log(`\n✅ MongoDB connected successfully!`);
    console.log(`   Host: ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (error) {
    console.error(`\n❌ Error connecting to MongoDB: ${error.message}`);
    
    process.exit(1);
  }
};

export default connectDB;