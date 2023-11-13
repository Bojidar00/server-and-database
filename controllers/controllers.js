import { pool } from "../db/db.js";
import { convertToEUR } from "../utils/currencyConversion.js";

const updateAccountBalance = async (client, accountId, amount, currency) => {
  let eurAmount = await convertToEUR(amount, currency);

  await client.query(
    `INSERT INTO accounts 
    (accountId, balance)
    VALUES ($1, $2)
    ON CONFLICT (accountId)
    DO 
      UPDATE SET balance = accounts.balance + excluded.balance
      `,
    [accountId, eurAmount],
  );
};

export const addTransaction = async (client, transaction) => {
  await client.query(
    `INSERT INTO transactions 
    (transactionId, 
    transactionType, 
    orderId, 
    amount, 
    currency, 
    description,
    accountId) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      transaction.transactionId,
      transaction.transactionType,
      transaction.orderId,
      transaction.amount,
      transaction.currency,
      transaction.description,
      transaction.accountId,
    ],
  );
};

export const newTransaction = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    switch (req.body.transactionType) {
      case "SALE": {
        await updateAccountBalance(client, req.body.accountId, req.body.amount, req.body.currency);
        break;
      }
      case "CREDIT": {
        await updateAccountBalance(client, req.body.accountId, -req.body.amount, req.body.currency);
        break;
      }
      case "REFUND": {
        await updateAccountBalance(client, req.body.accountId, -req.body.amount, req.body.currency);
        break;
      }
      default: {
        await client.query("ROLLBACK");
        return res.sendStatus(400);
      }
    }

    await addTransaction(client, req.body);

    await client.query("COMMIT");
    return res.sendStatus(200);
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return res.sendStatus(400);
  }
};

export const getAccountBalance = async (req, res) => {
  try {
    const result = await pool.query(`SELECT balance FROM accounts WHERE accountId = $1`, [
      req.params.id,
    ]);
    const balance = result.rows[0]?.balance || 0;
    return res.json({ balance: balance });
  } catch (err) {
    return res.sendStatus(500);
  }
};
