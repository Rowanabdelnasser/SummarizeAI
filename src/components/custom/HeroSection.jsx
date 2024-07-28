'use client';

import Link from "next/link";
import { StrapiImage } from "@/components/custom/StrapiImage";

const imageProps = {
    id: 0,// example default value
    url: "",
    alternativeText: ""
};
const linkProps = {
    id: 0,// example default value
    url: "",
    text: ""
};
const HeroSectionProps = {
    data: {
        id: 0, // example default value
        __component: "", // example default value
        heading: "", // example default value
        subheading: "",// example default value
        image: imageProps,
        link: linkProps
    }
};

export function HeroSection({ data }) {
    const { heading, subheading, image } = data;

    // Extract information from data if available
    const title = data?.heading || 'Default Heading';
    const description = data?.subheading || 'Default Description';

    return (
        <section className="hero">
            <div className="hero-image">
                <StrapiImage
                    src={image?.url}
                    alt={image?.alternativeText}
                    height={500} // Set a default or dynamic height
                    width={1600} // Set a default or dynamic width
                    className="hero-bg-image"
                />
            </div>
            <div className="container">
                <h1 className="text-6xl font-bold mb-6 p-4">{heading}</h1>
                <p className="text-xl text-500">{subheading}</p>
                <Link href="/learn-more">
                    <h6 className="btn-primary">Learn More</h6>
                </Link>
            </div>
            <style jsx>{`
    .hero {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 500px; /* Ensure section height is enough */
        color: white;
        overflow: hidden; /* Prevent content overflow */
    }
    .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex; /* Center image */
        justify-content: center; /* Center image */
        align-items: center; /* Center image */
        overflow: hidden;
    }
    .hero-bg-image {
        object-fit: cover; /* Cover the container completely */
        width: 100%;
        height: 100%;
    }
    .container {
        position: relative;
        text-align: center;
        z-index: 1; /* Ensure content is above the image */
    }
    .btn-primary {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        color: black;
        background-color: #ffffff;
        border: none;
        border-radius: 5px;
        text-decoration: none;
    }
    .btn-primary:hover {
        background-color: #005bb5;
    }
`}</style>


        </section>
    );
}
