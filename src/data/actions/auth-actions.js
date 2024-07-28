"use server";

export async function registerUserAction(PrevState, formData) {
    console.log("Hello From Register User Action");

    const fields = {
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
    };

    // Log fields individually for better visibility
    console.log("Username:", fields.username);
    console.log("Password:", fields.password);
    console.log("Email:", fields.email);

    return {
        ...PrevState,

        data: fields,
    };
}
