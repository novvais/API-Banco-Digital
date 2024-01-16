const express = require("express")
const conta = require("../controllers/accounts")
const tranacoes = require("../controllers/transactions")
const { password, password2 } = require("../middleware/middleware")

const route = express()

route.get("/", (req, res) => { 
    return res.status(200).json({ message: "Hello World!"})
})

route.get("/contas", password, conta.listAccounts)
route.post("/contas", conta.addAccount)
route.put("/contas/:numeroConta/usuario", conta.updateAccount)
route.delete("/contas/:numeroConta", conta.deleteAccount)

route.post("/transacoes/depositar", tranacoes.deposit)
route.post("/transacoes/sacar", tranacoes.withdrawal)
route.post("/transacoes/transferir", tranacoes.transfer)
route.get("/contas/saldo", password2, tranacoes.queryBalance)
route.get("/contas/extrato", password2, tranacoes.extract)

module.exports = route