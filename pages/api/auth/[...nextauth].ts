import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma';
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import  { User as NextAuthUser } from 'next-auth'

interface NextAuthUserWithStringId extends NextAuthUser {
  id: string
}


const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as NextAuthUserWithStringId
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
 adapter: PrismaAdapter(prisma),
//   adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.AUTH_SECRET,
  jwt : {
    secret: process.env.JWT_SECRET,
  }
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


