import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createProfessor = async (req, res) => {
	const {firstName, lastName} = req.body
	const result = await prisma.professor.create({
		data: {
			firstName,
			lastName
		}
	})
	res.json(result)
}

export const getProfessors = async (req, res) => {
	// const professors = await prisma.professor.findMany()
	// res.json(professors)
	try {
		
		// const professors = await prisma.professor.findMany() //Simple 
		const professors = await prisma.professor.findMany({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				subjects: {
					select: {
						subject: {
							select: {
								nameSubject: true
							}
						}
					}
				}
			}
		})
		
		// const professors = await prisma.professor.findMany({
		// 	include: {
		// 		subjects: {
		// 			include: {
		// 				subject: true
		// 			}
		// 		}
		// 	}
		// })

		res.json(professors) // response [] or {professors}
	} catch (error) {
		res.status(500).json({
			message: error
		})
	}
}

export const getProfessorById = async (req, res) => {
	const {id} = req.params
	const professor = await prisma.professor.findUnique({
		where: {
			id: Number(id)
		},
		include: {
			subjects: true
		}
	})
	res.json({professor})
}

export const updateProfessor = async (req, res) => {
	const {id} = req.params
	const {firstName, lastName} = req.body
	const professor = await prisma.professor.update({
		where: {id: Number(id)},
		data: {firstName, lastName}
	})
	res.json(professor)
}

export const deleteProfessor = async(req, res) => {
	const {id} = req.params
	const professor = await prisma.professor.delete({
		where: {id: Number(id)}
	})
	res.json('Delete')
}