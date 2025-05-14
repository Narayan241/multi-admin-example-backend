import { v6 } from "uuid";
import { userExistsWithEmail } from "../db/users";

import { User } from "../models/User";
import bcrypt from "bcrypt";

import { Request, Response } from "express";

import createHttpError from "http-errors";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const accessToken = v6();
  user.accessTokens.push(accessToken);
  user.updatedAt = new Date();
  await user.save();

  res.success(
    {
      accessToken,
      user: {
        name: user.name,
        email: user.email,
      },
    },
    "Login successful"
  );
};

function getCurrentUser(req: Request, res: Response) {
  const user = req.currentUser;
  if (!user) {
    return res.error(createHttpError.NotFound("User not found"));
  }
  res.success(
    {
      accessToken: req.accessToken,
      user,
    },
    "Current user retrieved successfully"
  );
}

export const authController = {
  login,
  getCurrentUser,
};
