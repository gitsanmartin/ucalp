import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getCareers = async (req, res) => { 
    try {
		// Simple call
		// const careers = await prisma.career.findMany()

		// get nameCareer
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
			message: "Err :( "
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
		res.json(error)
	}
	
}

export const createCareer = async (req, res) => { 
    const {nameCareer} = req.body
	const result = await prisma.career.create({
		data: {
			nameCareer
		}
	})
	res.json(result)
}

export const updateCareer = async (req, res) => { 
    const {id} = req.params
	const {nameCareer} = req.body
	const career = await prisma.career.update({
		where: {id: Number(id)},
		data: {nameCareer}
	})
	res.json(career)
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
		res.json(error)
	}
}