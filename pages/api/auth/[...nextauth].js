import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: '490232444315-41cbkh5p5gr7tm1khaio8lm89a9codba.apps.googleusercontent.com',
            clientSecret: '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',
        }),
    ],
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.uid = token.sub;
            return session;
            
        }
    }
})