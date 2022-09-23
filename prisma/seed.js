import { PrismaClient } from '@prisma/client'
import { professors } from './data/professors.js'
import { careers } from './data/careers.js'
import { subjects } from './data/subjects.js'
import { classrooms } from './data/classrooms.js'

const prisma = new PrismaClient()

async function main () {
	await prisma.professor.createMany({
		data: professors
	})

    await prisma.career.createMany({
		data: careers
	})

    await prisma.subject.createMany({
		data: subjects
	})

    await prisma.classroom.createMany({
		data: classrooms
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})