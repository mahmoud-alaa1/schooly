import { signIn as signInService } from "@/services/auth";
import { IUser } from "@/types/auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CredentialsType {
  email: string;
  password: string;
  rememberMe: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials) {
        const { email, password, rememberMe } = credentials as CredentialsType;

        if (!email || !password) {
          throw new CredentialsSignin("please provide both email and password");
        }

        const user = await signInService({
          email,
          password,
          rememberMe: rememberMe === "true",
        });

        if (!user || !user.data) {
          throw new CredentialsSignin("Invalid email or password");
        }

        return {
          id: user.data.id,
          email: user.data.email,
          name: user.data.name,
          token: user.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      let user = token as unknown as IUser;

      if (token.user) {
        user = token.user as IUser;
      }

      if (token) {
        session.user = {
          ...session.user,
          ...user,
        };
      }

      return session;
    },
  },
});
