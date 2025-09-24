import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user.email || undefined
      }
      return token
    },
    async session({ session, token }) {
      if (token && session?.user && token.id) {
        (session.user as any).id = token.id
      }
      return session
    },
    async signIn({ user, account, profile }) {
      return true
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

export { handler as GET, handler as POST }