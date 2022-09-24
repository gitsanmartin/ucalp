import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getSubjects = async (req, res) => { 
	try {
		const subjects = await prisma.subject.findMany({
			select: {
				id: true,
				nameSubject: true,
				duration: true,
				year: true,
				careers: {
					include: {
						career: {
							select: {
								nameCareer: true
							}
						}
					}
				}
				
			}
		})
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
			select: {
				name: true,
				split: true,
				classroom: {
					select: {
						number: true,
						capacity: true
					}
				}
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
	const {nameSubject, duration, year} = req.body
	try {
		const subject = await prisma.subject.update({
			where: {id: Number(id)},
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
	const {subjectId, professorId} = req.body
	try {
		const relation = await prisma.subjectAndProfessor.create({
			data: {
				subjectId,
				professorID: professorId
			}
		})
		res.json(relation)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const setRelationCareer = async (req, res) => {
	const {subjectId, careerId} = req.body
	try {
		const relation = await prisma.subjectAndCareer.create({
			data: {
				subjectId,
				careerId
			}
		})
		res.json(relation)
		
	} catch (error) {
		res.status(500).json(error)
	}
}