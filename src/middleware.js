import { NextResponse } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request) {
    const user = await getUserMeLoader();
    const currentPath = request.nextUrl.pathname;

    console.log("############################################################################    MIDDLE WARE ##################################");
    console.log(user);
    console.log(currentPath);

    console.log("############################################################################    MIDDLE WARE ##################################");


    if (currentPath.startsWith("/dashboard") && user.ok === false) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}