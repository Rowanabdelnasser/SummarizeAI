import Link from "next/link";
import Logo from "@/components/custom/Logo"; // Adjust the import if needed
import { Button } from "@/components/ui/button";

const Header = ({ data }) => {
    const { logoText, ctaButton } = data;

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
            <Logo text={logoText.text} />
            <div className="flex items-center gap-4">
                <Link href={ctaButton.url}>
                    <Button>{ctaButton.text}</Button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
