const express = require("express")
const banco = require("../controllers/banco")
const { password, password2 } = require("../middleware/middleware")

const route = express()

route.get("/contas", password, banco.listagemContas)
route.post("/contas", banco.adicionandoConta)
route.put("/contas/:numeroConta/usuario", banco.atualizarConta)
route.delete("/contas/:numeroConta", banco.excluirConta)
route.post("/transacoes/depositar", banco.deposito)
route.post("/transacoes/sacar", banco.saque)
route.post("/transacoes/transferir", banco.transferir)
route.get("/contas/saldo", password2, banco.consultaDoSaldo)
route.get("/contas/extrato", password2, banco.extrato)

module.exports = route