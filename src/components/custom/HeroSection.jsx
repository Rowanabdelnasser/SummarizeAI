import Link from 'next/link';
import { StrapiImage } from '@/components/custom/StrapiImage'; // Ensure this path is correct
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function HeroSection({ data }) {
    const user = await getUserMeLoader();
    const { heading, subheading, image, link } = data;

    const userLoggedIn = user.ok;
    const linkUrl = userLoggedIn ? "/dashboard" : link.url;
    // useEffect(() => {
    //     async function fetchUser() {
    //         try {
    //             const response = await fetch('/api/user/me');
    //             const result = await response.json();
    //             setUser(result);
    //         } catch (error) {
    //             console.error('Failed to fetch user:', error);
    //         }
    //     }
    //     fetchUser();
    // }, []);



    return (
        <section className="relative h-[500px] overflow-hidden flex items-center justify-center text-white">
            <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
                <StrapiImage
                    src={image?.url}
                    alt={image?.alternativeText}
                    height={500}
                    width={1600}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center bg-black bg-opacity-20 w-full h-full">
                <h1 className="text-6xl font-bold mb-6 p-4">{heading}</h1>
                <p className="text-xl  mt-4">{subheading}</p>
                <Link
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
                    href={linkUrl}
                >
                    {userLoggedIn ? 'GO TO DASHBOARD' : link.text}
                </Link>
            </div>
        </section>
    );
}