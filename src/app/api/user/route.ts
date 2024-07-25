import { userController } from "@/controllers/UserController";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        

        const users = await userController.getUsers();
        return NextResponse.json(users);

        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong "+ error.message }, { status: 500 });
        
    }
}

