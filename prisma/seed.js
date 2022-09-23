import { PrismaClient } from '@prisma/client'
import { professors } from './data/professors.js'
import { careers } from './data/careers.js'

const prisma = new PrismaClient()

async function main () {
	await prisma.professor.createMany({
		data: professors
	})

    await prisma.career.createMany({
		data: careers
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