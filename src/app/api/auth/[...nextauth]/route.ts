// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";

interface OHIDProfile {
  sub: string;
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile?: string;
  eidmlast4ssn?: string;
  telephoneNumber?: string;
  eidmaliases?: string;
  initials?: string;
  suffix?: string;
  eidmbirthdate?: string;
}

interface ExtendedToken {
  userId?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
}

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
        const p = profile as OHIDProfile;
        return {
          id: p.sub,
          name: `${p.firstname} ${p.lastname}`,
          email: p.email,
          firstName: p.firstname,
          lastName: p.lastname,
          mobile: p.mobile,
          userId: p.userid,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const p = profile as OHIDProfile;
        token.userId = p.userid;
        token.firstName = p.firstname;
        token.lastName = p.lastname;
        token.mobile = p.mobile;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as ExtendedToken;
      if (session.user) {
        (session.user as any).userId = t.userId;
        (session.user as any).firstName = t.firstName;
        (session.user as any).lastName = t.lastName;
        (session.user as any).mobile = t.mobile;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };