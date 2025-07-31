import User from "../model/User.js"
// export const Signup = async (req, res) => {
//   try {
//     console.log("req.auth:", req.auth); // 👈 Check if Clerk middleware is working
//     console.log(req.auth.sessionClaims);
//     const clerkUserId = req.auth.userId;
//     const email = req.auth.sessionClaims.email;

//     if (!clerkUserId || !email) {
//       return res.status(400).json({ message: "Missing Clerk user ID or email" });
//     }

//     let user = await User.findOne({ clerkUserId });
//     if (!user) {
//       user = await User.create({
//         clerkUserId,
//         email: email,
//         createdAt: new Date(),
//       });
//     }

//     res.status(201).json({ message: "User successfully created" });

//   } catch (error) {
//     console.error("Signup error:", error); // 👈 Log the actual error
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };