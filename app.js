import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// app.listen(PORT, '0.0.0.0', () => {
// 	console.log(` ✅ Server UP running in PORT ${PORT} ❤️`)
// })
app.listen(PORT, () => {
	console.log(` ✅ Server UP running in PORT ${PORT} ❤️`)
})