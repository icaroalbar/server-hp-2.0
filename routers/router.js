const router = require('express').Router()

router.get('/', (req, res) => res.send('Servidor do Grupo HP'))

module.exports = router