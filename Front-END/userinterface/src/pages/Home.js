import HeaderDesktop from "../components/HeaderDesktop";
import Category from "../components/Category";
import RestoCard from "../components/RestoCard";
import HeaderMobile from "../components/HeaderMobile";
import Chief from "../assets/img/categories/chef.png";
import FastFood from "../assets/img/categories/fast-food.png";
import Baguette from "../assets/img/categories/baguette.png";
import Bio from "../assets/img/categories/bio.png";
import Burger from "../assets/img/categories/burger.png";
import Seafood from "../assets/img/categories/fruit-de-mer.png";
import Cake from "../assets/img/categories/gateau.png";
import Greek from "../assets/img/categories/grece.png";
import Grill from "../assets/img/categories/grill.png";
import Indian from "../assets/img/categories/indie.png";
import Fusion from "../assets/img/categories/la-fusion.png";
import Vegeterian from "../assets/img/categories/legume.png";
import Local from "../assets/img/categories/local.png";
import Tapas from "../assets/img/categories/nachos.png";
import Pates from "../assets/img/categories/pates.png";
import Pizza from "../assets/img/categories/pizza.png";
import Asian from "../assets/img/categories/ramen.png";
import GlutenFree from "../assets/img/categories/sans-gluten.png";
import Taco from "../assets/img/categories/taco.png";
import Vegan from "../assets/img/categories/vegan.png";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
    const isMobile = window.innerWidth <= 600;
    const catImgEnum = {
        "Cuisine Française": Baguette,
        "Cuisine Italienne": Pates,
        "Plats Végétariens": Vegeterian,
        "Cuisine Asiatique": Asian,
        "Fruits de Mer et Poissons": Seafood,
        "Cuisine Américaine": Burger,
        "Fast Food": FastFood,
        "Plat Végan": Vegan,
        "Spécialités Locales": Local,
        "Grillades et Barbecue": Grill,
        "Cuisine Mexicaine": Taco,
        "Pâtisseries et Desserts": Cake,
        "Cuisine Méditerranéenne": Greek,
        "Pizza et Pâtes": Pizza,
        "Cuisine Fusion": Fusion,
        "Tapas et Apéritifs": Tapas,
        "Cuisine Indienne": Indian,
        "Cuisine Sans Gluten": GlutenFree,
        "Cuisine Bio et Naturelle": Bio,
        "Gastronomie et Haute Cuisine": Chief,
    }

    const [categories, setCategories] = useState([]);
    const [restos, setRestos] = useState([]);
    const [displayCount, setDisplayCount] = useState(7);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleShowMore = () => {
        setIsExpanded(true);
        setDisplayCount(categories.length);
    };

    const handleShowLess = () => {
        setIsExpanded(false);
        setDisplayCount(7);
    };

    /*const App = () => {
        useEffect(() => {
            axios.get('api-call')
                .then(response => {
                    setCategories(response.data.name)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }, [])

        useEffect(() => {
            axios.get('api-call')
                .then(response => {
                    setRestos(response.data.name)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }, []);
    }*/

    useEffect(() => {
        setCategories([
            {name: "Cuisine Française"},
            {name: "Cuisine Italienne"},
            {name: "Plats Végétariens"},
            {name: "Cuisine Asiatique"},
            {name: "Fruits de Mer et Poissons"},
            {name: "Cuisine Américaine"},
            {name: "Fast Food"},
            {name: "Plat Végan"},
            {name: "Spécialités Locales"},
            {name: "Grillades et Barbecue"},
            {name: "Cuisine Mexicaine"},
            {name: "Pâtisseries et Desserts"},
        ])
    }, []);

    return (
        <main className="h-screen w-full flex flex-col items-center">
            {!isMobile ? (
                <div className="h-screen w-full flex flex-col items-center">
                    <HeaderDesktop articlesCount={0} />
                    <div className="w-full flex flex-row flex-wrap h-2/5 space-x-2">
                        {categories.map((category, index) => (
                            <Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={() => console.log(category.name)} />
                        ))}
                    </div>
                    <div className="grid  grid-cols-5 gap-3 justify-center items-center h-4/5">
                        {restos.map((resto, index) => (
                            <RestoCard key={index} onClick={() => console.log(resto.name)} restoName={resto.name} restoImg={resto.img} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="h-screen w-full flex flex-col items-center">
                    <HeaderMobile />
                    <div className="w-full grid grid-cols-4 gap-1.5 h-1/5">
                        {categories.slice(0, displayCount).map((category, index) => (
                            <Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={() => console.log(category.name)} />
                        ))}
                        {categories.length > 7 && !isExpanded && (
                            <button className="bg-gray-300 hover:bg-gray-200 place-content-center justify-center p-1 mr-2 rounded-xl text-xs self-center" onClick={handleShowMore}>
                                Afficher plus
                            </button>
                        )}
                        {isExpanded && (
                            <button className="bg-gray-300 hover:bg-gray-200 place-content-center justify-center p-1 h-8 rounded-xl text-xs ml-2" onClick={handleShowLess}>Afficher moins</button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-3 justify-center items-center h-4/5">
                        {restos.map((resto, index) => (
                            <RestoCard key={index} onClick={() => console.log(resto.name)} restoName={resto.name} restoImg={resto.img} />
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
