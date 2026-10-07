import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '../database/prisma.service.js';



export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
     clientId: process.env.GOOGLE_CLIENT_ID as string,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  trustedOrigins: [
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
  ],
});
