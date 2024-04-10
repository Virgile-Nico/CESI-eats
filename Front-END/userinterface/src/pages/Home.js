import HeaderDesktop from "../components/HeaderDesktop";
import Category from "../components/Category";
import Chef from "../assets/img/categories/chef.png";
import FastFood from "../assets/img/categories/fast-food.png";
import Baguette from "../assets/img/categories/baguette.png";

export default function Home() {
    const isMobile = window.innerWidth <= 600;
    return (
        <main className="h-screen w-full flex flex-col items-center">
            {!isMobile && (
                <>
                    <HeaderDesktop articlesCount={0} />
                    <div className="w-full flex flex-row h-1/5 space-x-4">
                        <Category src={Baguette} catName={"Cuisine Française"} />
                        <Category src={FastFood} catName={"Fast-Food"} />
                        <Category src={Chef} catName={"Gastronomie"} />
                    </div>
                </>
            )}
        </main>
    );
}
