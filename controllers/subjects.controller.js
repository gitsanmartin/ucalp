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
		res.status(500).json({
			message: "Algo anda mal"
		})
	}
}

export const getSubject = async (req, res) => { 
	const {id} = req.params
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
	res.json({subject})
}

export const createSubject = async (req, res) => { 
	const {nameSubject, duration, year} = req.body
	const result = await prisma.subject.create({
		data: {
			nameSubject,
			duration,
			year
		}
	})
	res.json(result)
}

export const updateSubject = async (req, res) => { 
	const {id} = req.params
	const {nameSubject, duration, year} = req.body
	const subject = await prisma.subject.update({
		where: {id: Number(id)},
		data: {
			nameSubject, 
			duration,
			year
		}
	})
	res.json(subject)
}

export const deleteSubject = async (req, res) => { 
	const {id} = req.params
	const subject = await prisma.subject.delete({
		where: {id: Number(id)}
	})
	res.json('Delete one subject')
}

export const setRelationProfessor = async (req, res) => {
	const {subjectId, professorId} = req.body
	const relation = await prisma.subjectAndProfessor.create({
		data: {
			subjectId,
			professorID: professorId
		}
	})
	res.json(relation)
}

export const setRelationCareer = async (req, res) => {
	const {subjectId, careerId} = req.body
	const relation = await prisma.subjectAndCareer.create({
		data: {
			subjectId,
			careerId
		}
	})
	res.json(relation)
}