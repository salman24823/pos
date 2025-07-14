// src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ Fix for Webpack/ESM default export issue
const Credentials = CredentialsProvider.default ?? CredentialsProvider;

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Custom login page
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        console.log("Received login:", email, password);

        // Example validation (replace with DB logic)
        if (email === "test@example.com" && password === "123456") {
          return { id: "1", name: "Test User", email };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };




// 1. Define authOptions
// const authOptions = {
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         return
//         try {
//           await dbConnection();
//           const user = await User.findOne({ email });

//           if (!user) {
//             console.log("User not found");
//             return null;
//           }

//           const isMatch = await bcrypt.compare(password, user.password);
//           if (!isMatch) {
//             console.log("Invalid password");
//             return null;
//           }

//           return user;
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user._id;
//         token.username = user.name;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.username = token.username;
//       session.user.email = token.email;
//       return session;
//     },
//   },
// };

// 2. Create and export handler functions
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
