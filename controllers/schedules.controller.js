import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createSchedule = async (req, res) => {
	const {hhStart, mmStart, hhEnd, mmEnd, day} = req.body
	// 1970-01-01T17:07:12.000Z
	let leftBase = "1970-01-01T"
	let rightBase = ":12.000Z"
	const result = await prisma.schedule.create({
		data: {
			start: leftBase + hhStart + ":" + mmStart + rightBase,
			end: leftBase + hhEnd + ":" + mmEnd + rightBase,
			day
		}
	})
	res.json(result)
}

export const getSchedules = async (req, res) => {
	try {
		const schedules = await prisma.schedule.findMany()

		res.json({schedules})
	} catch (error) {
		res.status(500).json({
			message: "Algo anda mal"
		})
	}
}

export const getScheduleById = async (req, res) => {
	try {
		const {id} = req.params
		const schedule = await prisma.schedule.findUnique({
			where: {
				id: Number(id)
			}
		})
		res.json({schedule})
	} catch (error) {
		res.status(500).json(error)
	}
}

export const updateSchedule = async (req, res) => {
	try {
		const {id} = req.params
		const {hhStart, mmStart, hhEnd, mmEnd, day} = req.body
		// 1970-01-01T17:07:12.000Z
		let leftBase = "1970-01-01T"
		let rightBase = ":12.000Z"
		const schedule = await prisma.schedule.update({
			where: {id: Number(id)},
			data: {
				start: leftBase + hhStart + ":" + mmStart + rightBase,
				end: leftBase + hhEnd + ":" + mmEnd + rightBase,
				day
			}
		})
		res.json(schedule)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteSchedule = async (req, res) => {
	try {
		const {id} = req.params
		const schedule = await prisma.schedule.delete({
			where: {id: Number(id)}
		})
		res.json('Deleted')
	} catch (error) {
		res.status(500).json(error)
	}
}