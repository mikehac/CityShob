import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export class AuthService {
  async register(username: string, password: string): Promise<User> {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await user.save();
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      return null;
    }
    const token = jwt.sign({ id: user._id, username: user.username }, config.jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  }
}
