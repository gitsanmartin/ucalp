import { PrismaClient } from '@prisma/client'
import { professors } from './data/professors.js'
import { careers } from './data/careers.js'
import { subjects } from './data/subjects.js'
import { classrooms } from './data/classrooms.js'
import { subjectInProfessor, subjectInCareer } from './data/subjectsRelations.js'

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

    await prisma.subjectAndProfessor.createMany({
		data: subjectInProfessor
	})

    await prisma.subjectAndCareer.createMany({
		data: subjectInCareer
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