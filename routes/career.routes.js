import { Router } from 'express'
import { createCareer, deleteCareer, getCareer, getCareers, updateCareer } from '../controllers/careers.controller.js'

const router = Router()

router.get('/', getCareers)
router.get('/:id', getCareer)
router.post('/', createCareer)
router.put('/:id', updateCareer)
router.delete('/:id', deleteCareer)

export default router