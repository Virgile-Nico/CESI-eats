import HeaderDesktop from "../components/HeaderDesktop";

export default function Home() {
    const isMobile = window.innerWidth <= 600;
    return (
        <main className="h-screen w-full flex flex-col items-center">
            {!isMobile && (
                <HeaderDesktop articlesCount={0} />

            )}
        </main>
    )
}