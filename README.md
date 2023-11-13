# server-and-database
This is a node.js application that connects to PostgreSQL.
## Project Setup

You need [PostgreSQL](https://www.postgresql.org/)
Create a .env file. See .env.example

```bash
npm install
```

## Run

```bash
npm start
```
### Endpoints
1. Stores a new transaction and updates balance of account.
    - Transaction type of SALE will debit the account.
    - Transaction type of CREDIT or REFUND will credit the account.
```bash
POST /transaction
```
```bash
curl 'http://localhost:8080/transaction' \
    -H 'content-type: application/json' \
    --data-raw '{"transactionId":"tqZi6QapS41zcEHy","orderId":"c66oxMaisTwJQXjD", "transactionType":"SALE", "amount": "10.00", "currency":"EUR", "description":"Test transaction", "accountId":"001"}'
```
2. Returns the current balance of account.
```bash
GET /account/:id
```
```bash
curl 'http://localhost:8080/account/1'
```

