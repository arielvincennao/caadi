import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
