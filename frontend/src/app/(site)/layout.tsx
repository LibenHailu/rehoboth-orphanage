import siteMetadata from "@/lib/metadata";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Navigation } from "@/components/navigation";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="mt-20 flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}