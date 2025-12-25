import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log("request body: ", reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "user does not exist for the given email", success: false },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "the entered password is wrong", success: false },
        { status: 400 }
      );
    }

    //ceate token data
    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "login successful", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
