const password = (req, res, next) => {
    const { senha_banco } = req.query

    if(!senha_banco) {
        res.status(404).json({mensagem: "Informe a senha por favor"})
    } else if (senha_banco !== "123") {
        res.status(400).json({mensagem: "Senha incorreta"})
    }

    next()
}

const password2 = (req, res, next) => {
    const { senha } = req.query

    if(!senha) {
        res.status(404).json({mensagem: "Informe a senha por favor"})
    } else if (senha !== "123") {
        res.status(400).json({mensagem: "Senha incorreta"})
    }

    next()
}
module.exports = { password, password2 } 