to start the project:
  - cd into client folder and run `npm i`, after it's done run `ng serve`, open `localhost:4200`
  - open `.env` file inside the server folder, and adjust the database config
  - cd into server folder and run `npm i`, after it's done run `npx prisma generate`, then `npx prisma migrate dev`, then `node prisma/seed.js`, then `npm run dev`, server should listen to `port 6500`
