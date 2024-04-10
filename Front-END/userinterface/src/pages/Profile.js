import Avatar from "../components/Avatar";
import Footer from "../components/Footer";

export default function Profile() {
    return (
        <main className="flex flex-col items-center justify-between h-screen">
            <Avatar firstname={'Nathalie'} lastname={'parisse'} />
            <Footer />
        </main>
    )
}