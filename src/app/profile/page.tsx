"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser]:any = useState("");
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setUser(response.data.data);
    } catch (error) {}
  };
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      console.log(response);

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <h2 className="p-1 rounded bg-green-500">{user ? <Link href={`/profile/${user.username}`}>{user?.username}</Link> : "No user data Found"}</h2>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get user details
      </button>
    </div>
  );
}
