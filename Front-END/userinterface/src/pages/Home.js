import HeaderDesktop from "../components/HeaderDesktop";
import Category from "../components/Category";
import RestoCard from "../components/RestoCard";
import HeaderMobile from "../components/HeaderMobile";
import Footer from "../components/Footer";
import Icon from "@mdi/react";
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
import {mdiMinusBox, mdiPlusBox} from "@mdi/js";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import test from "../assets/img/tests/images.jpg";

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
    const [restos, setRestos] = useState([{name: '', img: '', categories: [], id: ''}]);
    const [displayCount, setDisplayCount] = useState(7);
    const [isExpanded, setIsExpanded] = useState(false);
    const articlesCount = useSelector(state => state.articlesCount);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(isAuthenticated);
    const [isArticlesCountLocal, setIsArticlesCountLocal] = useState(articlesCount);
    useEffect(() => {
        setIsAuthenticatedLocal(isAuthenticated);
        setIsArticlesCountLocal(articlesCount);
    }, [isAuthenticated, articlesCount]);

    /*const [selectedCategory, setSelectedCategory] = useState(null);
    const handleSortBy = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const filteredRestos = selectedCategory
        ? restos.filter(resto => resto.categories.includes(selectedCategory))
        : restos;
*/
    const handleShowMore = () => {
        setIsExpanded(true);
        setDisplayCount(categories.length);
    };

    const handleShowLess = () => {
        setIsExpanded(false);
        setDisplayCount(7);
    };

    /*useEffect(() => {
        axios.get('api-call')
            .then(response => {
                setCategories(response.data.name)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [])

    useEffect(() => {
        axios.get('http://213.32.6.121:')
            .then(response => {
                setRestos(response.data.name)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);*/

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
            {name: "Cuisine Méditerranéenne"},
        ]);
        setRestos([
            {
                name: "Resto 1",
                img: "https://worldinparis.com/wp-content/uploads/2019/10/steak-frites.jpg",
                categories: ["Cuisine Française"],
                id: "1"
            },
            {name: "Resto 2", img: test, categories: ["Cuisine Italienne"], id: "2"},
            {
                name: "Resto 3",
                img: "https://realfood.tesco.com/media/images/RFO-1400x919-Pasta-mini-mini-b876d7d9-32d3-4568-8803-1dfe995043d4-0-1400x919.jpg",
                categories: ["Plats Végétariens"],
                id: "3"
            },
            {
                name: "Resto 4",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6hCBkzF9lIY4nL2cE7qpo6yUphXimajXPgFdxQtETQ&s",
                categories: ["Cuisine Asiatique"],
                id: "4"
            },
            {
                name: "Resto 5",
                img: "https://www.foodandwine.com/thmb/x5Xd9vyWwaPochuUbAU3typL8RM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-seafood-boil-with-cajun-seasoning-hero-02-e202a099e35a4cd2b00aadb486eed146.jpg",
                categories: ["Fruits de Mer et Poissons"],
                id: "5"
            },
            {
                name: "Resto 6",
                img: "https://media01.stockfood.com/largepreviews/MjU2NDU2OA==/00082728-American-food-hot-dogs-pizza-hamburger.jpg",
                categories: ["Cuisine Américaine"],
                id: "6"
            },
            {
                name: "Resto 7",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-kzogG2H14rbtP1VoRaRMqU7A7B7ag7rbHCptRuKLpg&s",
                categories: ["Fast Food"],
                id: "7"
            },
            {
                name: "Resto 8",
                img: "https://images.immediate.co.uk/production/volatile/sites/30/2023/01/Ponzu-tofu-poke-bowl-8733c67.jpg?quality=90&resize=440,400",
                categories: ["Plat Végan"],
                id: "8"
            },
            {
                name: "Resto 9",
                img: "https://cdn.sortiraparis.com/images/80/103598/961048-atelier-fargo-la-patisserie-artisanale-gourmande-au-levain-naturel-saint-honore-eclairs.jpg",
                categories: ["Pâtisserie et Desserts"],
                id: "9"
            },
        ]);
    }, []);


    const navigate = useNavigate();

    const navigateToRestaurantMenu = (restaurantId) => {
        const restaurantMenuUrl = `/restaurant/${encodeURIComponent(restaurantId)}/menu`;
        navigate(restaurantMenuUrl);
    };

    return (
        <main className="h-screen w-full flex flex-col items-center">
            <div className="h-screen w-full flex flex-col items-center">
                {!isMobile ? (
                    <HeaderDesktop isAuthenticated={isAuthenticatedLocal} articlesCount={isArticlesCountLocal}/>
                ) : (
                    <HeaderMobile/>
                )}
                <div
                    className={!isMobile ? "w-full flex flex-row flex-wrap h-2/5 space-x-2" : "w-full grid grid-cols-4 gap-1 h-1/5"}>
                    {!isMobile ? (
                        categories.map((category, index) => (
                            <Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={() => console.log(category.name)}/>
                            /*<Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={handleSortBy(category.name)} />*/
                        ))
                    ) : (
                        categories.slice(0, displayCount).map((category, index) => (
                            <Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={() => console.log(category.name)}/>
                            /*<Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={handleSortBy(category.name)} />*/
                        ))
                    )}
                    {categories.length > 7 && !isExpanded && (
                        <button className="bg-transparent flex flex-col items-center p-2" onClick={handleShowMore}>
                            <div className="place-content-center justify-center p-4 rounded-xl">
                                <Icon path={mdiPlusBox} size={1}/>
                            </div>
                            <h5 className="text-center text-xs md:text-sm font-semibold">Afficher plus</h5>
                        </button>
                    )}
                    {isExpanded && (
                        <button className="bg-transparent flex flex-col items-center p-2" onClick={handleShowLess}>
                            <div className="place-content-center justify-center p-4 rounded-xl">
                                <Icon path={mdiMinusBox} size={1}/>
                            </div>
                            <h5 className="text-center text-xs md:text-sm font-semibold">Afficher moins</h5>
                        </button>
                    )}
                </div>
                <div
                    className={!isMobile ? "grid grid-cols-5 gap-3 justify-center items-center h-4/5" : "grid grid-cols-1 gap-3 justify-center items-center h-4/5"}>
                    {restos.map((resto, index) => (
                        <RestoCard key={index} onClick={() => navigate("/restaurant-menu")} restoName={resto.name} restoImg={resto.img}/>
                        /*<RestoCard key={index} onClick={() => navigateToRestaurantMenu(resto.id)} restoName={resto.name} restoImg={resto.img}/>*/
                    ))}
                </div>
            </div>
        <Footer/>
    </main>
    );
}
