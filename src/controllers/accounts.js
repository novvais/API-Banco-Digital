const db = require("../database/database");
const { format } = require("date-fns");

let counter = 1;

const listAccounts = (req, res) => {
  return res.status(200).json(db.contas);
};

const addAccount = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const verificacaoCPF = db.contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  if (verificacaoCPF) {
    return res.status(400).json({ mensagem: "CPF ja cadastrado." });
  }

  const verificacaoEmail = db.contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (verificacaoEmail) {
    return res.status(400).json({ mensagem: "Email ja cadastrado." });
  }

  const dados = {
    numero: counter++,
    saldo: 0,
    usuario: req.body,
  };

  db.contas.push(dados);

  return res.status(201).json(dados);
};

const updateAccount = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email } = req.body;

  let conta = db.contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!conta) {
    return res.status(404).json({ mensagem: "Informe um Numero de Conta valido." });
  }

  if (!nome && !cpf && !data_nascimento && !telefone && !email) {
    return res.status(400).json({ mensagem: "Informe pelo menos uma propriedade." });
  }

  const verificacaoCPF = db.contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  if (verificacaoCPF) {
    return res.status(400).json({ mensagem: "CPF ja cadastrado." });
  }

  const verificacaoEmail = db.contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (verificacaoEmail) {
    return res.status(400).json({ mensagem: "Email ja cadastrado." });
  }

  conta.usuario = req.body;

  return res.status(201).json({ mensagem: "Atualizacao concluida com sucesso." });
};

const deleteAccount = (req, res) => {
  const { numeroConta } = req.params;

  if (!numeroConta) {
    return res.status(400).json({ mensagem: "Por favor informe um Numero de Conta valido." });
  }

  const conta = db.contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!conta) {
    return res.status(404).json({ mensagem: "Usuario nao encontrado." });
  }

  db.contas = db.contas.filter((deleteAccount) => {
    return deleteAccount.numero !== Number(numeroConta);
  });
  
  return res.status(201).json({ mensagem: "Conta deletada com sucesso." });
};

module.exports = {
  listAccounts,
  addAccount,
  updateAccount,
  deleteAccount
};
