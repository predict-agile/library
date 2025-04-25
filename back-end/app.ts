import express from 'express'
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()
const app = express()

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

app.get('/find-book/:book_name', async (req, res) => {
	const book = await prisma.book.findFirst({
	  where: { book_name: req.params.book_name },
	})
	res.json(book)
  })

const server = app.listen(3000)
