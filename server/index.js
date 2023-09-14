const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03cb854f444c11ad42ec95e053e1955cc508ce09fe6a0c7fce6ed43ae15edd3211": 100,
  "03d96b9ed9cd8b53efacd0436dc552a1f2c9471aeb1789923d8f5169b4d07ae5fa": 50,
  "02ab5d09296857c987bf93481ffaf19046db015b808d3c8461553084253dcf8804": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}


//private 4757618bcd1c04024358424518c61c3e37e21451e3633745d3e77842e6528f80
//public 03cb854f444c11ad42ec95e053e1955cc508ce09fe6a0c7fce6ed43ae15edd3211

//private c9ad26392c8743e0cbfc08cb018ba0264d6f1627fd554c0d81847b62e590ccb9
// public 03d96b9ed9cd8b53efacd0436dc552a1f2c9471aeb1789923d8f5169b4d07ae5fa

// private f36c0a6eb40a316dbd11473d875fae7699bb35bf8175f705af03c5c2c82641be
// public 02ab5d09296857c987bf93481ffaf19046db015b808d3c8461553084253dcf8804