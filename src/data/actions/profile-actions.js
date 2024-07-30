"use server";
import qs from "qs";
import { mutateData } from "../services/mutate-data";
import { flattenAttributes } from "@/lib/utils";

export async function updateProfileAction(
    userId,
    prevState,
    formData
) {
    const rawFormData = Object.fromEntries(formData);

    const query = qs.stringify({
        populate: "*",
    });

    const payload = {
        firstName: rawFormData.firstName,
        lastName: rawFormData.lastName,
        bio: rawFormData.bio,
        id: rawFormData.id,
    };

    const responseData = await mutateData(
        "PUT",
        `/api/users/${userId}?${query}`,
        payload
    );

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            message: "Failed to Register.",
        };
    }

    const flattenedData = flattenAttributes(responseData);

    return {
        ...prevState,
        message: "Profile Updated",
        data: payload,
        strapiErrors: null,
    };
}