import app from "./app";
import connectDB from "./db/db";

const startServer = async () => {
  await connectDB();
  const port = 3000;

  app.listen(port, () => {
    console.log(`listining on port :${port}`);
  });
};

startServer();
