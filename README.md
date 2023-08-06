# Software as a Service AI Platform with Next.js 13, React, Tailwind, Prisma, Stripe

![Saas CompanionAI](https://github.com/jcodev2/ai-companion/assets/72767265/119ec4a3-7c8b-4457-9502-c60c3c1ca3a0)

## Features:

- **Tailwind design**
- **Clerk Authentication (Email, Google)**
- **Client form validation and handling using react-hook-form**
- **Server error handling using react-toast**
- **Prisma ORM**
- **Upload Images to Cloudinary**
- **Conversation Generation Tool (Open AI)**
- **Stripe monthly subscription**
- **Free tier with API limiting**
- **How to handle relations between Server and Child components!**

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone git@github.com:jcodev2/ai-companion.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

```shell
npx prisma db push
```

Seed categories:

```shell
node scripts/seed.ts
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
