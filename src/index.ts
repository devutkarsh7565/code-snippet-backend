import app from "./app";
import connectDB from "./db/db";

const startServer = async () => {
  await connectDB();
  const port = 4000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`listining on port :${port}`);
  });
};

startServer();
