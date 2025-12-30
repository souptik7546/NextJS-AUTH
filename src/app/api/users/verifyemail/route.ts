import {connectDB} from "@/dbConfig/dbConfig"
import { NextResponse ,NextRequest} from "next/server"
import User from "@/models/userModels"

connectDB()

export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
        const {token}=reqBody
        console.log(token);

        const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt : Date.now()}})

        if(!user){
            return NextResponse.json({message:"token has expired",success:false},{status:400})
        }

        console.log(user)

        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save()

        return NextResponse.json({message:"user verified successful",success:true},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message,success:false},{status:500})
    }
}