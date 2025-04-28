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
	if (book != null) {
		const author = await prisma.author.findFirst({
			where: { author_id: book.fk_author_id },
		})
		var author_name = ""
		if (author != null) {
			author_name = author.author_name
		}

		const genre = await prisma.genre.findFirst({
			where: { genre_id: book.fk_genre_id },
		})
		var genre_name = ""
		if (genre != null) {
			genre_name = genre.genre_name
		}

		const language = await prisma.languages.findFirst({
			where: { language_id: book.fk_language_id },
		})
		var language_name = ""
		if (language != null) {
			language_name = language.language_name
		}

		const publisher = await prisma.publisher.findFirst({
			where: { publisher_id: book.fk_publisher_id },
		})
		var publisher_name = ""
		if (publisher != null) {
			publisher_name = publisher.publisher_name
		}

		res.json({
			book_name: book.book_name,
			author_name: author_name,
			genre_name: genre_name,
			language_name: language_name,
			publisher_name: publisher_name
		})
	}
  })

app.get('/checkout-book/:book_name', async (req, res) => {
	const book = await prisma.book.findFirst({
		where: { book_name: req.params.book_name },
	})
	
	if (book != null) {
		const findInventory = await prisma.inventory.findFirst({
			where: {fk_book_id: book.book_id},
		})

		if (findInventory != null) {
			if (findInventory.available_count > 0) {
				const updateInventory = await prisma.inventory.update({
					where: {inventory_id: findInventory.inventory_id},
					data: {available_count: {increment: -1}},
				})
				res.json({message: book.book_name + " checked out"})
			}
			else {
				const waitlist = await prisma.waitlist.create({
					data: {
						waitlist_id: 1,
						fk_cust_id: 1,
						fk_location_id: 1,
						fk_book_id: book.book_id,
					}
				})
				res.json({message: book.book_name + " added to waitlist"})
			}
		}
	}
  })

  app.get('/checkout-book/:book_name', async (req, res) => {
	const book = await prisma.book.findFirst({
		where: { book_name: req.params.book_name },
	})
	
	if (book != null) {
		const wishlist = await prisma.wishlist.create({
			data: {
				wishlist_id: 1,
				fk_cust_id: 1,
				fk_location_id: 1,
				fk_book_id: book.book_id,
			}
		})
		res.json({message: book.book_name + " added to wishlist"})
	}
  })

const server = app.listen(3000)
