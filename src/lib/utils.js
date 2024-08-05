import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export function flattenAttributes(data) {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

// export function extractYouTubeID(urlOrID) {
//   // Regular expression for YouTube ID format
//   const regExpID = /^[a-zA-Z0-9_-]{11}$/;

//   // Check if the input is a YouTube ID
//   if (regExpID.test(urlOrID)) {
//     return urlOrID;
//   }

//   // Regular expression for standard YouTube links
//   const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

//   // Regular expression for YouTube Shorts links
//   const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

//   // Check for standard YouTube link
//   const matchStandard = urlOrID.match(regExpStandard);
//   if (matchStandard) {
//     return matchStandard[1];
//   }

//   // Check for YouTube Shorts link
//   const matchShorts = urlOrID.match(regExpShorts);
//   if (matchShorts) {
//     return matchShorts[1];
//   }

//   // Return null if no match is found
//   return null;
// }

export function extractYouTubeID(urlOrID) {
  // Check if input is a valid string
  if (typeof urlOrID !== "string") {
    return null; // Return null if input is not a string
  }

  // Regular expression for YouTube ID format
  const regExpID = /^[a-zA-Z0-9_-]{11}$/;

  // Check if the input is a YouTube ID
  if (regExpID.test(urlOrID)) {
    return urlOrID;
  }

  // Regular expression for standard YouTube links
  const regExpStandard = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  // Regular expression for YouTube Shorts links
  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

  // Check for standard YouTube link
  const matchStandard = urlOrID.match(regExpStandard);
  if (matchStandard) {
    return matchStandard[1];
  }

  // Check for YouTube Shorts link
  const matchShorts = urlOrID.match(regExpShorts);
  if (matchShorts) {
    return matchShorts[1];
  }

  // Return null if no match is found
  return null;
}
