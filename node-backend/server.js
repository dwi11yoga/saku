import express from "express";
import cors from "cors";

// import routes
import transactionsRoute from "./routes/transactionsRoute.js";

// definisikan expressjs
const app = express();

// izinkan request dari frontend (memungkinkan backend & frontend berkomunikasi)
app.use(cors());
app.use(express.json());

app.use("/api/pengeluaran", transactionsRoute);

// jalankan webserver
app.listen(3000, () => {
  console.log("Server is running on https://localhost:3000");
});
