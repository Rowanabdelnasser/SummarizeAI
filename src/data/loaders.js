import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./services/get-token";
const baseUrl = getStrapiURL();

async function fetchData(url) {
    const authToken = await getAuthToken();


    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    };

    try {
        console.log("Fetching data from URL:", url); // Debug URL
        const response = await fetch(url, authToken ? headers : {});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debug Data
        return flattenAttributes(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // or return null;
    }
}

export async function getHomePageData() {
    //throw new Error("Test error");

    const url = new URL("/api/home-page", baseUrl);
    url.search = qs.stringify({
        populate: {
            blocks: {
                populate: {
                    image: {
                        fields: ["url", "alternativeText"],
                    },
                    link: {
                        populate: true,
                    },
                    feature: {
                        populate: true,
                    }
                },
            },
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
    console.log("Constructed URL:", url.href); // Debug URL
    return await fetchData(url.href);
}

export async function getGlobalPageData() {
    const url = new URL("/api/global", baseUrl);
    url.search = qs.stringify({
        populate: [
            "header.logoText",
            "header.ctaButton",
            "footer.logoText",
            "footer.socialLink",
        ],
    })
    return await fetchData(url.href);
}
export async function getGlobalPageMetadata() {
    const url = new URL("/api/global", baseUrl);
    url.search = qs.stringify({
        fields: ["title", "description"]
    })
    return await fetchData(url.href);
}

export async function getSummaries() {
    const url = new URL("/api/summaries", baseUrl);
    return fetchData(url.href);
}