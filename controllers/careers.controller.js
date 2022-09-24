import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getCareers = async (req, res) => { 
    try {
		const careers = await prisma.career.findMany({
			include:{
				subjects: {
					select: {
						subject: {
							select: {
								id: true,
								nameSubject: true
							}
						}
					}
				}
			}
		})

		res.json(careers)
	} catch (error) {
		res.status(500).json({
			message: "Err :( ",
			error
		})
	}
}

export const getCareer = async (req, res) => { 
    try {
		const {id} = req.params
		const career = await prisma.career.findUnique({
			where: {
				id: Number(id)
			}
		})
		res.json({career})	
	} catch (error) {
		res.status(500).json(error)
	}
	
}

export const createCareer = async (req, res) => { 
    const {nameCareer} = req.body
	try {
		const result = await prisma.career.create({
			data: {
				nameCareer: nameCareer.toLowerCase()
			}
		})
		res.json(result)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const updateCareer = async (req, res) => { 
    const {id} = req.params
	const {nameCareer} = req.body
	try {
		const career = await prisma.career.update({
			where: {id: Number(id)},
			data: {
				nameCareer: nameCareer.toLowerCase()
			}
		})
		res.json(career)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteCareer = async (req, res) => { 
	// consultar si existe en la relacion subjects-careers, y primero eliminar de la relación
	try {
		const {id} = req.params
		await prisma.career.delete({
			where: {
				id: Number(id)
			}
		})
		res.json(`Delete career`)
	} catch (error) {
		res.status(500).json(error)
	}
}