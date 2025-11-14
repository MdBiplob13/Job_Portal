import jwt from "jsonwebtoken";

export const generateToken = (userId, userRole) => {
  const payload = { userId, role: userRole };

  // Generate JWT token
  const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
