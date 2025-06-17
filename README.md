# Weather App

A simple weather web application developed as part of a subject exam project. 

The primary goal of this project is to showcase my practical knowledge within fetching and integration of data from external API, administration and management of users and data within Firebase with security in mind, the usage of modern front-end solutions (such as React and Next.js) and basic UI/UX skills and universal design.

## Technologies and Framework Used

### Front-End

- JavaScript
- TypeScript
- HTML5
- CSS3
- React
- Next.js

### Back-End

- Firebase (Auth and Firestore)

### API

- Open-Meteo (API and Geocoding)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Clone this GitHub repository to your preferred location and install the project dependencies by running:

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Environment Variables

Before running the project, create a `.env.local` file in the root directory. Add your Firebase credentials to this file.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Starting the Project

To start the development server using npm, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sources

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Open-Meteo Documentation](https://open-meteo.com/en/docs)
- [ChatGPT](https://chat.openai.com/)
- [React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton)
- [Iconify](https://icon-sets.iconify.design/)