import { getTokenData } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModels";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request:NextRequest){

    try {
        const receivedUserData:any= await getTokenData(request)
        const userData= await User.findById(receivedUserData?._id).select("-password ")
        return NextResponse.json({message:"user data fetched successfully",success:true,data:userData},{status:200})
    } catch (error:any) {
         return NextResponse.json({message: error.message,success:false},{status:400})
    }
}