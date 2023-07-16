import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs'
import records from './routes/record.mjs'
import data from './routes/data.mjs'

const PORT  = process.env.PORT || 5050
const app = express()

app.use(cors());
app.use(express.json({ limit: '1000kb' }))
app.use('/uploads', express.static('uploads'))

app.use('/record', records)
app.use('/data', data)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})