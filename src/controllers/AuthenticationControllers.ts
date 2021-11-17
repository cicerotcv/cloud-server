import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { HEADERS } from "../constants";
import { generateToken, makeError } from "../helpers";
import { User } from "../models/User";

const TOKEN_EXPIRATION = "30d";

class AuthenticationController {
  async createAccount(req: Request, res: Response) {
    try {
      const { email, username, password } = req.body;

      if (!email) {
        return res.status(400).json({ error: "No email provided" });
      }

      if (!username) {
        return res.status(400).json(makeError("You must provide an username"));
      }

      if (!password) {
        return res.status(400).json({ error: "No password provided" });
      }

      const userAlreadyExists = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (!!userAlreadyExists) {
        return res
          .status(400)
          .json(makeError("Email or username already in use"));
      }

      const user = await User.create({
        email,
        username,
        password
      });

      user.password = undefined;

      const token = generateToken(
        { id: user._id },
        { expiresIn: TOKEN_EXPIRATION }
      );
      res.setHeader(HEADERS.AUTH, token);

      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      const passwordMatches = await bcrypt.compare(password, user.password!);

      if (!passwordMatches) {
        return res.status(401).send({ error: "Wrong email or password" });
      }

      const token = generateToken(
        { id: user.id },
        { expiresIn: TOKEN_EXPIRATION }
      );

      user.password = undefined;
      res.setHeader(HEADERS.AUTH, token);
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      const passwordMatches = await bcrypt.compare(password, user.password!);

      if (!passwordMatches) {
        return res.status(401).send({ error: "Wrong email or password" });
      }

      const userDeleted = await User.findByIdAndDelete(user._id);

      return res.json({
        userDeleted: !!userDeleted
      });
    } catch (error) {}
  }
}

export const authController = new AuthenticationController();
