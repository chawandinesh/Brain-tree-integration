const express = require("express");
const bodyParser = require("body-parser");
const braintree = require("braintree");
const cors = require("cors");
const app = express();
const port = 8000;
app.use(bodyParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("api is working");
});

app.get("/initializeBraintree", async (req, res) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "nvwdmmfd9p8wxk2c",
    publicKey: "cskzm2984rhcg6vk",
    privateKey: "bfdbd8414c8c245330954e4c14fc40c4",
  });
  let token = (await gateway.clientToken.generate({})).clientToken;
  res.send({ data: token });
});

app.post("/confirmBraintree", async (req, res) => {
  const data = req.body;
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "nvwdmmfd9p8wxk2c",
    publicKey: "cskzm2984rhcg6vk",
    privateKey: "bfdbd8414c8c245330954e4c14fc40c4",
  });

  let transactionResponse = await gateway.transaction.sale({
    amount: data.amount,
    paymentMethodNonce: data.nonce,
    options: {
      submitForSettlement: true,
    },
  });
  res.send({ data: transactionResponse });
});

app.listen(port, () => {
  console.log("app is running on " + port);
});
