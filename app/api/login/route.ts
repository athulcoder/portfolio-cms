import { NextResponse } from "next/server"
export async function POST(request: Request) {

    const body = await request.json()
    const { username, password } = body;

    if (!username || !password) {
          return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );

    }

     //db logic
  

    return NextResponse.json(

        { message: "hello how. are u", },
        { status: 200 }
    )
}