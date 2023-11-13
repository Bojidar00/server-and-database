import { describe, it, expect } from "vitest";
import { transaction, transaction2 } from "./testData.js";
import { app } from "../index.js";
import request from "supertest";
import * as dotenv from "dotenv";

dotenv.config();

describe("API tests", () => {
  it("Should return balance of account", async () => {
    const response = await request(app)
      .get(`/account/${transaction.accountId}`)
      .set("Accept", "application/json");
    expect(Number(response.body.balance)).to.equal(0);
  });

  it("Should update balance", async () => {
    await request(app)
      .post(`/transaction`)
      .send(transaction)
      .set("Accept", "application/json")
      .expect(200);

    const response = await request(app)
      .get(`/account/${transaction.accountId}`)
      .set("Accept", "application/json");
    expect(Number(response.body.balance)).to.equal(transaction.amount);
  });

  it("Should not accept same transaction twice", async () => {
    await request(app)
      .post(`/transaction`)
      .send(transaction2)
      .set("Accept", "application/json")
      .expect(200);
    try {
      await request(app)
      .post(`/transaction`)
      .send(transaction)
      .set("Accept", "application/json");
    } catch (err) {
      expect(err.response.status).to.equal(400);
    }
  });
});
