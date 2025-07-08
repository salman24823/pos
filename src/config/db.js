import mongoose from "mongoose";

const dbConnection = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb is Now Connected");
  } catch (error) {
    console.log(error, "Error From Mongodb Connection Error");
  }
};
export default dbConnection;

await dbConnection();
