import { getTokenData } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModels";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();