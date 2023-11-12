import { pool } from "./db.js";

const createAccountsTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS accounts (
        accountId INTEGER PRIMARY KEY,
        balance NUMERIC(10,2) DEFAULT 0
        )`,
  );
};

const createTransactionsTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS transactions (
        transactionId varchar(16) PRIMARY KEY,
        transactionType varchar(6),
        orderId varchar(16),
        amount NUMERIC(10,2),
        currency varchar(3),
        description TEXT,
        accountId INTEGER,
        CONSTRAINT fk_account
        FOREIGN KEY(accountId)
	    REFERENCES accounts(accountId)
        )`,
  );
};

export const run = async () => {
  await createAccountsTable();
  await createTransactionsTable();
};
