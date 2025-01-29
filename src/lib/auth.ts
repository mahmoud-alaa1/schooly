import { signIn as signInService } from "@/services/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CredentialsType {
  email: string;
  password: string;
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
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const { email, password } = credentials as Partial<CredentialsType>;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        try {
          const user = await signInService(email, password);

          if (!user || !user.data) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.data.id,
            email: user.data.email,
            name: user.data.name,
            token: user.token,
          };
        } catch (error) {
          console.error("Sign-in error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
});
