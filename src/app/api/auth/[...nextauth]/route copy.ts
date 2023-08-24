import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth"
import { prisma } from "@/db";
import {compare} from "bcryptjs";


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                
                try {
                    if (!credentials?.username || !credentials?.password) {
                        return null
                    }
                    
                    const user = await prisma.users.findMany({
                        where: {
                            username: credentials?.username
                        },
                    })
                    console.log("credentials",credentials, user)
                    if (user.length == 0) {
                        return null;
                    }

                    if(user.length> 0){
                        const user1 = user[0];
                        const tmpPassword = credentials?.password;
                        const userPassword = user1?.password;
                        const passwordsMatch = await compare(tmpPassword, userPassword);
                        if (!passwordsMatch) {
                        return null;
                    }
                    }
                    

                    // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
                // console.log("credentials.username",credentials.username,)

            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };