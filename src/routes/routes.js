const express = require("express")
const conta = require("../controllers/conta")
const tranacoes = require("../controllers/transacoes")
const { password, password2 } = require("../middleware/middleware")

const route = express()

route.get("/contas", password, conta.listarContas)
route.post("/contas", conta.adicionandoConta)
route.put("/contas/:numeroConta/usuario", conta.atualizarConta)
route.delete("/contas/:numeroConta", conta.excluirConta)
route.post("/transacoes/depositar", tranacoes.deposito)
route.post("/transacoes/sacar", tranacoes.saque)
route.post("/transacoes/transferir", tranacoes.transferir)
route.get("/contas/saldo", password2, tranacoes.consultaDoSaldo)
route.get("/contas/extrato", password2, tranacoes.extrato)

module.exports = route