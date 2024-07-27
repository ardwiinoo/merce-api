import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { parseFlags } from './utils/parser'
import { env } from './utils/env'
import typeable from './utils/typeable'
import plugins from './api'

const flags = parseFlags(process.argv)
dotenv.config({
    path: flags.env
})

const app = express()

app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    typeable,
    logger(':method \t :url \t :status \t :response-time ms'),
    cors({
        origin: env.get('CORS_ALLOWED_ORIGIN').toString('*'),
        credentials: true,
        allowedHeaders: ["Accept", 'X-Requested-With', 'X-HTTP-Method-Override', "Content-Type", "Content-Length", "Accept-Encoding", "Authorization"]
    })
)

plugins.forEach(({ plugin, options }) => {
    plugin.register(app, options)
})

app.listen(env.get('PORT').toNumber(3000), () => {
    console.log(`Server running at http://${env.get('HOST').toString()}:${env.get('PORT').toString()}`);
})