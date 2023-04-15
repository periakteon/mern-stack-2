import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB bağlantısı başarılı. DB ismi: ${connect.connection.name}`);
  } catch (error) {
    console.error(`DB Bağlantısı Başarısız: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
