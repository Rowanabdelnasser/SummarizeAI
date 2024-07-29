"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { registerUserService } from "../services/auth-services";

const config = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
    username: z.string().min(3).max(20, {
        message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().min(6).max(100, {
        message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

export async function registerUserAction(PrevState, formData) {
    console.log("Hello From Register User Action");

    const validatedFields = schemaRegister.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return {
            ...PrevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
            message: "Missing Fields. Failed to Register.",
        };
    }

    const responseData = await registerUserService(validatedFields.data);

    if (!responseData) {
        return {
            ...PrevState,
            strapiErrors: null,
            zodErrors: null,
            message: "Oops!!!! Somthing went wrong. Please try again."
        }
    }
    if (responseData.error) {
        return {
            ...PrevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Register.",
        }
    }

    cookies().set("jwt", responseData.jwt, config);
    redirect("/dashboard");

    console.log("###################################################################################################################");
    console.log("user reg successfully", responseData.jwt);
    console.log("###################################################################################################################");

    return {
        ...PrevState,
        data: "ok",
    };
}
