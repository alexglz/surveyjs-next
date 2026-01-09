// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "ohid",
      name: "OHID",
      type: "oauth",
      wellKnown: `${process.env.OHID_ISSUER}/.well-known/openid-configuration`,
      clientId: process.env.OHID_CLIENT_ID!,
      clientSecret: process.env.OHID_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email firstname lastname mobile",
        },
      },
      idToken: true,
      checks: ["state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.firstname} ${profile.lastname}`,
          email: profile.email,
          firstName: profile.firstname,
          lastName: profile.lastname,
          mobile: profile.mobile,
          userId: profile.userid,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.userId = profile.userid;
        token.firstName = profile.firstname;
        token.lastName = profile.lastname;
        token.mobile = profile.mobile;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userId = token.userId as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.mobile = token.mobile as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };