import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getClassrooms = async (req, res) => { 
	try {
		const classrooms = await prisma.classroom.findMany({
			include: {
				subjects: true
			}
		})
		res.json(classrooms) // or {classrooms} for array[{classrooms}]

	} catch (error) {
		res.status(500).json(error)
	}
}

export const getClassroom = async (req, res) => { 
	const {id} = req.params
	try {
		const classroom = await prisma.classroom.findUnique({
			where: {
				id: Number(id)
			}
		})
		res.json(classroom)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const createClassroom = async (req, res) => { 
	const {classroomNumber, description, capacity} = req.body
	try {
		const result = await prisma.classroom.create({
			data: {
				classroomNumber,
				description: description.toLowerCase(),
				capacity
			}
		})
		res.json(result)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const updateClassroom = async (req, res) => { 
	const {id} = req.params
	const {classroomNumber, description, capacity} = req.body
	try {
		const classroom = await prisma.classroom.update({
			where: {id: Number(id)},
			data: {
				classroomNumber,
				description: description.toLowerCase(),
				capacity
			}
		})
		res.json(classroom)
		
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteClassroom = async (req, res) => { 
	const {id} = req.params
	try {
		await prisma.classroom.delete({
			where: {id: Number(id)}	
		})
		res.json('Delete classroom')

	} catch (error) {
		res.status(500).json(error)
	}
}