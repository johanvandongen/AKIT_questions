import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs'
import records from './routes/record.mjs'
import data from './routes/data.mjs'
import { expressjwt } from 'express-jwt';
import jwks from 'jwks-rsa'

const PORT  = process.env.PORT || 5050
const domain = process.env.DOMAIN || '';

const verifyJWT = expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
    }),
    audience: `https://${domain}/api/v2/`,
    issuer: `https://${domain}/`,
    algorithms: ['RS256'],
})

const app = express()

app.use(cors());
app.use(express.json({ limit: '1000kb' }))
app.use('/uploads', express.static('uploads'))

app.use(verifyJWT)
app.use('/record', records)
app.use('/data', data)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})