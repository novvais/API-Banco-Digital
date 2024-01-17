const db = require("../database/database");
const { format } = require("date-fns");

const deposit = (req, res) => {
  const { numero_conta, valor } = req.body;
  
  const account = db.contas.find((account) => {
    return account.numero === Number(numero_conta);
  });
  
  if (!account) {
    return res.status(404).json({ message: "Please Enter a Valid Account Number" });
  }

  if (valor <= 0) {
    return res.status(400).json({message: "Insert a value that is positive and above 0."});
  }

  account.saldo += valor;

  const data = {
    data: format(new Date(), "MM/dd/yyyy"),
    numero_conta,
    valor,
  };

  db.depositos.push(data);

  return res.status(201).json({ message: "Successful deposit." });
};

const withdrawal = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  const account = db.contas.find((account) => {
    return account.numero === Number(numero_conta);
  });

  if (!account) {
    return res.status(404).json({ message: "Please Enter a Valid Account Number." });
  }

  if (valor > account.saldo) {
    return res.status(400).json({ message: "Insufficient balance." });
  }

  if (senha !== 123) {
    return res.status(400).json({ message: "Incorrect password." });
  }

  account.saldo -= valor;

  const data = {
    data: format(new Date(), "MM/dd/yyyy"),
    numero_conta,
    valor,
  };

  db.saques.push(data);

  return res.status(201).json({ message: "Withdrawal successful." });
};

const transfer = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  const source_account = db.contas.find((accountSource) => {
    return accountSource.numero === Number(numero_conta_origem);
  });

  if (!source_account) {
    return res.status(404).json({ message: "Please Enter a Valid Account Number" });
  }

  const destination_account = db.contas.find((accountDestination) => {
    return accountDestination.numero === Number(numero_conta_origem);
  });

  if (!destination_account) {
    return res.status(404).json({ message: "Please Enter a Valid Account Number" });
  }

  if (valor > source_account.valor) {
    return res.status(400).json({ message: "Insufficient balance." });
  }

  if (senha !== "123") {
    return res.status(400).json({ message: "Incorrect password." });
  }

  source_account.saldo -= valor;
  destination_account.saldo += valor;

  const data = {
    data: format(new Date(), "MM/dd/yyyy"),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  db.transferencias.push(data);

  return res.status(201).json({ message: "Transfer successful" });
};

const queryBalance = (req, res) => {
  const { numero_conta } = req.query;

  const account = db.contas.find((account) => {
    return account.numero === Number(numero_conta);
  });

  if (!account) {
    return res.status(404).json({ message: "Enter a valid Account Number." });
  }

  return res.status(200).json(`saldo: ${account.saldo}`);
};

const extract = (req, res) => {
  const { numero_conta } = req.query;

  const account = db.contas.find((account) => {
    return account.numero === Number(numero_conta);
  });

  if (!account) {
    return res.status(404).json({ message: "Enter a valid Account Number." });
  }

  const withdrawalAccount = db.saques.filter((withdrawal) => {
    return withdrawal.numero_conta === numero_conta;
  });

  const depositAccount = db.saques.filter((deposit) => {
    return deposit.numero_conta === numero_conta;
  });

  const transfersSent = db.transferencias.filter((sent) => {
    return sent.numero_conta_origem === numero_conta;
  });

  const transfersReceived = db.transferencias.filter((received) => {
    return received.numero_conta_destino === numero_conta;
  });

  const data = {
    withdrawals: withdrawalAccount,
    deposits: depositAccount,
    transfersSent,
    transfersReceived
  };

  return res.status(200).json(data);
};

module.exports = {
  deposit,
  withdrawal,
  transfer,
  queryBalance,
  extract,
};
