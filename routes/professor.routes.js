import { Router } from "express"
import { createProfessor, deleteProfessor, getProfessorById, getProfessors, updateProfessor } from "../controllers/professors.controller.js"

const router = Router()

router.get('/', getProfessors)
router.get('/:id', getProfessorById)
router.post('/', createProfessor)
router.put('/:id', updateProfessor)
router.delete('/:id', deleteProfessor)

export default router