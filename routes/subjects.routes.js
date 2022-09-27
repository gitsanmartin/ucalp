import { Router } from 'express'
import { 
		createSubject, 
		deleteSubject, 
		getSubject, 
		getSubjects, 
		setRelationCareer, 
		setRelationProfessor,
		delRelationProfessor,
		delRelationCareer,
		updateSubject,
		createSchedule
	} from '../controllers/subjects.controller.js'

const router = Router()

router.get('/', getSubjects)
router.get('/:id', getSubject)
router.post('/', createSubject)
router.put('/:id', updateSubject)
router.delete('/:id', deleteSubject)

router.post('/:subject/professor/:professor', setRelationProfessor)
router.delete('/:subject/professor/:professor', delRelationProfessor)
router.post('/:subject/career/:career', setRelationCareer)
router.delete('/:subject/career/:career', delRelationCareer)

router.post('/:subject/schedule/', createSchedule)

export default router