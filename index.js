import 'dotenv/config'
import express from 'express'

import userRouter from './routes/user.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Servidor en http://localhost:'+PORT);
})