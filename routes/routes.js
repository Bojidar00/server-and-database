import express from "express";
import { newTransaction, getAccountBalance } from "../controllers/controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Transactions app");
});

router.post("/transaction", newTransaction);

router.get("/account/:id", getAccountBalance);

export default router;
