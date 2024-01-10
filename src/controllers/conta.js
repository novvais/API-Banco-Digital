let {
  contas
} = require("../database/bancodedados");
const { format } = require("date-fns");

let contador = 1;

const listarConta = (req, res) => {
  return res.status(200).json(contas.first());
};

const adicionandoConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const verificacaoCPF = contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  if (verificacaoCPF) {
    return res.status(400).json({ mensagem: "CPF ja cadastrado." });
  }

  const verificacaoEmail = contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (verificacaoEmail) {
    return res.status(400).json({ mensagem: "Email ja cadastrado." });
  }

  const dados = {
    numero: contador++,
    saldo: 0,
    usuario: req.body,
  };

  contas.push(dados);

  return res.status(201).json(dados);
};

const atualizarConta = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  let conta = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!conta) {
    return res
      .status(404)
      .json({ mensagem: "Informe um Numero de Conta valido." });
  }

  if (!nome && !cpf && !data_nascimento && !telefone && !email) {
    return res
      .status(400)
      .json({ mensagem: "Informe pelo menos uma propriedade." });
  }

  const verificacaoCPF = contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  if (verificacaoCPF) {
    return res.status(400).json({ mensagem: "CPF ja cadastrado." });
  }

  const verificacaoEmail = contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (verificacaoEmail) {
    return res.status(400).json({ mensagem: "Email ja cadastrado." });
  }

  conta.usuario = req.body;

  return res
    .status(201)
    .json({ mensagem: "Atualizacao concluida com sucesso." });
};

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  const conta = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!numeroConta) {
    return res
      .status(400)
      .json({ mensagem: "Por favor informe um Numero de Conta valido." });
  }

  if (!conta) {
    return res.status(404).json({ mensagem: "Usuario nao encontrado." });
  }

  contas = contas.filter((excluirConta) => {
    return excluirConta.numero !== Number(numeroConta);
  });

  return res.status(201).json({ mensagem: "Conta deletada com sucesso." });
};

module.exports = {
  listarConta,
  adicionandoConta,
  atualizarConta,
  excluirConta
};
