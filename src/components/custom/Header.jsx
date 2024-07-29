import Link from "next/link";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import Logo from "@/components/custom/Logo"; // Adjust the import if needed
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./LogoutButton";



export function LoggedInUser({ userData }) {
    return (
        <div className="flex gap-2">
            <Link
                href="/dashboard/account"
                className="font-semibold hover:text-primary"
            >
                {userData.username}
            </Link>
            <LogoutButton />
        </div>
    );
}


export async function Header({ data }) {
    const user = await getUserMeLoader();
    console.log(user);
    const { logoText, ctaButton } = data;

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
            <Logo text={logoText.text} />
            <div className="flex items-center gap-4">
                {user.ok ? (
                    <LoggedInUser userData={user.data} />
                ) : <Link href={ctaButton.url}>
                    <Button>{ctaButton.text}</Button>
                </Link>}
            </div>
        </div>
    );
};

export default Header;
