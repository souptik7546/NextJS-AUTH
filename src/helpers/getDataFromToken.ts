import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const getTokenData=async(request:NextRequest)=>{
    try {
        const token =request.cookies.get("token")?.value||'';
        const tokenDecodedData=jwt.verify(token, process.env.TOKEN_SECRET!);
        return tokenDecodedData;
    } catch (error) {
        console.log(error);
        
    }
}
