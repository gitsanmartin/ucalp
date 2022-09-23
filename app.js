import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import professorsRoutes from './routes/professor.routes.js'
import classroomsRoutes from './routes/classroom.routes.js'
import subjectsRoutes from './routes/subjects.routes.js'
import careerRoutes from './routes/career.routes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/professors', professorsRoutes)
app.use('/classrooms', classroomsRoutes)
app.use('/subjects', subjectsRoutes)
app.use('/careers', careerRoutes)

// app.listen(PORT, '0.0.0.0', () => {
// 	console.log(` ✅ Server UP running in PORT ${PORT} ❤️`)
// })
app.listen(PORT, () => {
	console.log(` ✅ Server UP running in PORT ${PORT} ❤️`)
})