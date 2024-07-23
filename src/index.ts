import app from "./app";
import connectDB from "./db/db";

const startServer = async () => {
  await connectDB();
  const port = 4000;

  app.get("/", (req, res) => {
    res.json({
      app: "code snippet app",
    });
  });

  app.listen(port, () => {
    console.log(`listining on port :${port}`);
  });
};

startServer();
