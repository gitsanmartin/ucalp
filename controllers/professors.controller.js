import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createProfessor = async (req, res) => {
	const {firstName, lastName} = req.body
	try {
		const result = await prisma.professor.create({
			data: {
				firstName: firstName.toLowerCase(),
				lastName: lastName.toLowerCase()
			}
		})
		res.json(result)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const getProfessors = async (req, res) => {
	try {
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
		res.json(professors) // response [] or {professors}

	} catch (error) {
		res.status(500).json(error)
	}
}

export const getProfessorById = async (req, res) => {
	const {id} = req.params
	try {
		const professor = await prisma.professor.findUnique({
			where: {
				id: Number(id)
			},
			include: {
				subjects: true
			}
		})
		res.json(professor)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const updateProfessor = async (req, res) => {
	const {id} = req.params
	const {firstName, lastName} = req.body
	try {
		const professor = await prisma.professor.update({
			where: {id: Number(id)},
			data: {
				firstName: firstName.toLowerCase(),
				lastName: lastName.toLowerCase()
			}
		})
		res.json(professor)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteProfessor = async(req, res) => {
	const {id} = req.params
	try {
		await prisma.professor.delete({
			where: {id: Number(id)}
		})
		res.json('Delete professor')
		
	} catch (error) {
		res.status(500).json(error)
	}
}