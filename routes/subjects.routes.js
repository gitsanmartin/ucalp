import { Router } from 'express'
import { createSubject, deleteSubject, getSubject, getSubjects, setRelationCareer, setRelationProfessor, updateSubject } from '../controllers/subjects.controller.js'

const router = Router()

router.get('/', getSubjects)
router.get('/:id', getSubject)
router.post('/professor', setRelationProfessor)
router.post('/career', setRelationCareer)
router.post('/', createSubject)
router.put('/:id', updateSubject)
router.delete('/:id', deleteSubject)

export default router