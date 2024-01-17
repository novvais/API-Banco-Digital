const db = require("../database/database");
const { format } = require("date-fns");

let counter = 1;

const listAccounts = (req, res) => {
  return res.status(200).json(db.contas);
};

const addAccount = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const verificationCPF = db.contas.find((account) => {
    return account.usuario.cpf === cpf;
  });

  if (verificationCPF) {
    return res.status(400).json({ message: "CPF already registered." });
  }

  const verificationEmail = db.contas.find((account) => {
    return account.usuario.email === email;
  });

  if (verificationEmail) {
    return res.status(400).json({ message: "Email already registered." });
  }

  const data = {
    numero: counter++,
    saldo: 0,
    usuario: req.body,
  };

  db.contas.push(data);

  return res.status(201).json(data);
};

const updateAccount = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email } = req.body;

  let account = db.contas.find((account) => {
    return account.numero === Number(numeroConta);
  });

  if (!account) {
    return res.status(404).json({ message: "Enter a valid Account Number." });
  }

  if (!nome && !cpf && !data_nascimento && !telefone && !email) {
    return res.status(400).json({ message: "Enter at least one property." });
  }

  const verificationCPF = db.contas.find((account) => {
    return account.usuario.cpf === cpf;
  });

  if (verificationCPF) {
    return res.status(400).json({ message: "CPF ja cadastrado." });
  }

  const verificationEmail = db.contas.find((account) => {
    return account.usuario.email === email;
  });

  if (verificationEmail) {
    return res.status(400).json({ message: "Email already registered." });
  }

  account.usuario = req.body;

  return res.status(201).json({ message: "Update completed successfully." });
};

const deleteAccount = (req, res) => {
  const { numeroConta } = req.params;

  if (!numeroConta) {
    return res.status(400).json({ message: "Please enter a valid Account Number." });
  }

  const account = db.contas.find((account) => {
    return account.numero === Number(numeroConta);
  });

  if (!account) {
    return res.status(404).json({ message: "User not found." });
  }

  db.contas = db.contas.filter((deleteAccount) => {
    return deleteAccount.numero !== Number(numeroConta);
  });
  
  return res.status(201).json({ message: "Account successfully deleted." });
};

module.exports = {
  listAccounts,
  addAccount,
  updateAccount,
  deleteAccount
};
