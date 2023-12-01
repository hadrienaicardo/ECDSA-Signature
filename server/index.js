const express = require("express");
const app = express();
const cors = require("cors");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, hexToBytes, toHex } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const port = 3042;
app.use(cors());
app.use(express.json());

const balances = {
  "034c4c6e06c67b82c559c430e00f68dfaea6ec2e3a3fbbc40cf7feb1ab2a078581": 100,
  "02c0e19fe5ccd5013c02c895584f36c72492fb91dfca4c338c081c8de3a59fdc63": 50,
  "030c9ecbe5c0a345226c5bfe853cb64b68a6b9c155259678d8cd2cf4081e15e4ab": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  signature.r = BigInt(signature.r);
  signature.s = BigInt(signature.s);

  try {
  const verification = secp256k1.verify(signature, hashMessage(`Envoi de ${amount} ETH`), hexToBytes(sender))
  
    if (verification == false) {
      throw new Error('Signature invalide !');
    }

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: "Not valid signature !"});
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

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}
