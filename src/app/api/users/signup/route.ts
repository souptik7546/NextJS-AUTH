import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      password: hashedPassword,
      email,
      username,
    });

    console.log(newUser);

    const savedUser = await newUser.save();

    console.log("after saving the user ", savedUser);

    //send email

    const emailResonse=await sendEmail({email:savedUser?.email,emailType:"VERIFY",userId:savedUser?._id})

    console.log(emailResonse);
    

    return NextResponse.json(
      {
        message: "user created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
