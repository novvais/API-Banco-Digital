let {
    contas,
    saques,
    depositos,
    transferencias
} = require("../database/bancodedados");
const { format } = require("date-fns");

const deposito = (req, res) => {
  const { numero_conta, valor } = req.body;

  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!conta) {
    return res
      .status(404)
      .json({ mensagem: "Por favor Insira um Numero de Conta valido" });
  }

  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "Insira um valor que seja positivo e acima de 0 Reais.",
    });
  }

  conta.saldo += valor;

  const dados = {
    data: format(new Date(), "MM/dd/yyyy"),
    numero_conta,
    valor,
  };

  depositos.push(dados);

  return res.status(201).json({ mensagem: "Deposito realizado com sucesso." });
};

const saque = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!conta) {
    return res.status(404).json({ mensagem: "Por favor Insira um Numero de Conta valido" });
  }

  if (valor > conta.saldo) {
    return res.status(400).json({ mensagem: "Saldo insuficiente" });
  }

  if (senha !== 123) {
    return res.status(400).json({ mensagem: "Senha incorreta." });
  }

  conta.saldo -= valor;

  const dados = {
    data: format(new Date(), "MM/dd/yyyy"),
    numero_conta,
    valor,
  };

  saques.push(dados);

  return res.status(201).json({ mensagem: "Saque realizado com sucesso." });
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  const conta_origem = contas.find((contaOrigem) => {
    return contaOrigem.numero === Number(numero_conta_origem);
  });

  if (!conta_origem) {
    return res.status(404).json({ mensagem: "Por favor informe um numero de conta valido" });
  }

  const conta_destino = contas.find((contaDestino) => {
    return contaDestino.numero === Number(numero_conta_origem);
  });

  if (!conta_destino) {
    return res
      .status(404)
      .json({ mensagem: "Por favor informe um numero de conta valido" });
  }

  if (valor > conta_origem.valor) {
    return res.status(400).json({ mensagem: "Saldo Insuficiente" });
  }

  if (senha !== "123") {
    return res.status(400).json({ mensagem: "Senha incorreta." });
  }

  conta_origem.saldo -= valor;
  conta_destino.saldo += valor;

  const dados = {
    data: format(new Date(), "MM/dd/yyyy"),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  transferencias.push(dados);

  return res
    .status(201)
    .json({ mensagem: "Tranferencia realizada com sucesso" });
};

const consultaDoSaldo = (req, res) => {
  const { numero_conta } = req.query;

  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!conta) {
    return res
      .status(404)
      .json({ mensagem: "Informe um Numero de Conta valido." });
  }

  return res.status(200).json(`saldo: ${conta.saldo}`);
};

const extrato = (req, res) => {
  const { numero_conta } = req.query;

  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!conta) {
    return res
      .status(404)
      .json({ mensagem: "Informe um Numero de Conta valido." });
  }

  const contaSaques = saques.filter((saque) => {
    return saque.numero_conta === numero_conta;
  });

  const contaDeposito = saques.filter((deposito) => {
    return deposito.numero_conta === numero_conta;
  });

  const transferenciasEnviadas = transferencias.filter((enviadas) => {
    return enviadas.numero_conta_origem === numero_conta;
  });

  const transferenciasRecebidas = transferencias.filter((recebidas) => {
    return recebidas.numero_conta_destino === numero_conta;
  });

  const dados = {
    saques: contaSaques,
    depositos: contaDeposito,
    transferenciasEnviadas: transferenciasEnviadas,
    transferenciasRecebidas: transferenciasRecebidas,
  };

  return res.status(200).json(dados);
};

module.exports = {
  deposito,
  saque,
  transferir,
  consultaDoSaldo,
  extrato,
};
