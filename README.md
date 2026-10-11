<a name="readme-top"></a>

# Compalist Server

Backend API for Compalist, a company review/rating platform.

## About
Node.js/Express/MongoDB backend powering Compalist's company listings, ratings, blog and contact features (built 2024-09). Part of the Compalist product family alongside its web clients.

## Features
- User authentication (signup, email verification, JWT-based sessions)
- Company listings with ratings
- Blog posts
- Contact form submissions
- Suggest-a-company flow
- Image uploads to S3
- Stats endpoint

## Tech stack
- Node.js, Express, TypeScript
- MongoDB (via Typegoose/Mongoose)
- AWS S3 (`@aws-sdk/client-s3`)
- JWT auth, bcrypt
- Mailjet / Nodemailer for email

## API documentation
- [Authentication](./docs/Auth.md)
- [Blog](./docs/Blog.md)
- [Contact](./docs/Contact.md)

## Architecture
```
src/
  config/       database, bucket and key config
  controllers/  route handlers (auth, blog, company, contact, rating, stats, suggest)
  middlewares/  admin and user auth guards
  models/       Mongoose/Typegoose schemas
  routes/       Express routers
  services/     email, s3
  utils/        error handling, tokens, helpers
```

## Getting started
```bash
npm install
cp .env.example .env   # fill in real values
npm run dev
```
Environment variables (see `.env.example`): `PORT`, `MONGO_URI`, `BASE_CLIENT_URL`, `BASE_SERVER_URL`, `TOKEN_KEY`, `EMAIL_LINK`, `EMAIL_ACCOUNT`, `EMAIL_NAME`, `MJ_APIKEY_PUBLIC`, `MJ_APIKEY_PRIVATE`.

## Status
Active, part of the Compalist project.

## Related projects
- [compalist-client](https://github.com/tolgazorlu/compalist-client)
