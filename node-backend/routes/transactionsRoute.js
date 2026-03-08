import express from "express";
import { getAllTransactions } from "../controllers/transactionController.js";

const router = express.Router();

// GET /api/transaksi
router.get("/", getAllTransactions);

// export rotes agar bisa dipakai di server.js
export default router;
