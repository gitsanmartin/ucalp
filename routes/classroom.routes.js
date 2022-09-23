import { Router } from "express"
import { createClassroom, deleteClassroom, getClassroom, getClassrooms, updateClassroom } from "../controllers/classroms.controller.js"

const router = Router()

router.get('/', getClassrooms)
router.get('/:id', getClassroom)
router.post('/', createClassroom)
router.put('/:id', updateClassroom)
router.delete('/:id', deleteClassroom)

export default router