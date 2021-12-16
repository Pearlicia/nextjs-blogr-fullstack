import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers/github';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { getProviders, providers } from 'next-auth/client';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  // adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};

// import NextAuth from "next-auth"
// import Providers from "next-auth/providers"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// export default NextAuth({
//     // Configure one or more authentication providers
//     providers: [
//         Providers.Github ({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//     ],
//     adapter: PrismaAdapter(prisma),
// })


