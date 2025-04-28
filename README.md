# library

# back-end

Before running, you will need an .env file to connect to the database.

The .env file must have the following line: DATABASE_URL="mysql://anr486:infsci2710_4780076@159.65.239.201:3306/anr486"

Go to /library/back-end in a terminal (such as bash, powershell may not work).

Run `npm i` to install the node packages needed to run the back end.

Run `npx prisma generate` to create the files for Prisma, which is an ORM.

Type `npm start` and the server will run on localhost:3000.

# front-end-1

Go to /library/front-end-1 in a terminal (such as bash, powershell may not work).

Run `npm i` to install the node packages needed to run the front end.

Type `npm run dev` to get the server going on localhost:5173.