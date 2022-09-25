import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getSubjects = async (req, res) => { 
	try {
		const subjects = await prisma.subject.findMany()
		res.json(subjects)

	} catch (error) {
		res.status(500).json(error)
	}
}

export const getSubject = async (req, res) => { 
	const {id} = req.params
	try {
		const subject = await prisma.subject.findUnique({
			where: {
				id: Number(id)
			},
			include: {
				professors: true,
				careers: true,
				schedule: true
			}
		})
		res.json(subject)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const createSubject = async (req, res) => {
	const {nameSubject, duration, year} = req.body
	try {
		const subject = await prisma.subject.create({
			data: {
				nameSubject: nameSubject.toLowerCase(),
				duration: duration.toLowerCase(),
				year
			}
		})
		res.json(subject)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const updateSubject = async (req, res) => { 
	const {id} = req.params
	const {nameSubject, duration, year, students, classroom_id} = req.body
	try {
		const subject = await prisma.subject.update({
			where: {id: Number(id)},
			data: {
				nameSubject: nameSubject.toLowerCase(),
				duration: duration.toLowerCase(),
				year,
				students,
				classroom_id
			}
		})
		res.json(subject)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteSubject = async (req, res) => { 
	const {id} = req.params
	try {
		await prisma.subject.delete({
			where: {id: Number(id)}
		})
		res.json('Delete one subject')

	} catch (error) {
		res.status(500).json(error)
	}
}

export const setRelationProfessor = async (req, res) => {
	const { subject, professor } = req.params
	try {
		const relation = await prisma.subjectAndProfessor.create({
			data: {
				subjectId: parseInt(subject),
				professorId: parseInt(professor)
			}
		})
		res.json(relation)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const delRelationProfessor = async (req, res) => {
	const { subject, professor } = req.params
	try {
		await prisma.subjectAndProfessor.delete({
			where: {
				subjectId: Number(subject),
				professorId: Number(professor)
			}
		})
		res.json(relation)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const setRelationCareer = async (req, res) => {
	const { subject, career } = req.params
	try {
		const relation = await prisma.subjectAndCareer.create({
			data: {
				subjectId: parseInt(subject),
				careerId: parseInt(career)
			}
		})
		res.json(relation)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const delRelationCareer = async (req, res) => {
	const { subject, career } = req.params
	try {
		await prisma.subjectAndCareer.delete({
			where: {
				subjectId: Number(subject),
				careerId: Number(career)
			}
		})
		res.json(relation)
	} catch (error) {
		res.status(500).json(error)
	}
}