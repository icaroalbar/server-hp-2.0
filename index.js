"use strict";
const express = require('express')
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())

const RouterContact = require('./routers/routerContact')
const RouterIndex = require('./routers/router')

app.use(express.json())

app.use('/contact', RouterContact)
app.use('/', RouterIndex)

app.listen(8080, () => console.log(`SERVIDOR EM FUNCIONAMENTO`))