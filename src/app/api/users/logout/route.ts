import { NextResponse } from "next/server";


export async function GET(){
try {
    const response=NextResponse.json({message:"successfully logged out",success:true},{status:200})
    response.cookies.delete("token");
    return response

} catch (error:any ) {
    return NextResponse.json({message:"error while logging out",success:false},{status:500})
}
}