import { Router } from 'express'
import { createSchedule, deleteSchedule, getScheduleById, getSchedules, updateSchedule } from '../controllers/schedules.controller.js'

const router = Router()

router.get('/', getSchedules)
router.get('/:id', getScheduleById)
router.post('/', createSchedule)
router.put('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)

export default router