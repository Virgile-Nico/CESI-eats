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
import ItemMenu from "../components/ItemMenu";
import {useSelector} from "react-redux";

// mapStateToProps function to map state to props
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    articlesCount: state.articlesCount
});

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

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const filteredRestos = selectedCategory
        ? restos.filter(resto => resto.categories.includes(selectedCategory))
        : restos;

    useEffect(() => {
        setIsAuthenticatedLocal(isAuthenticated);
        setIsArticlesCountLocal(articlesCount);
    }, [isAuthenticated, articlesCount]);

    const handleShowMore = () => {
        setIsExpanded(true);
        setDisplayCount(categories.length);
    };

    const handleShowLess = () => {
        setIsExpanded(false);
        setDisplayCount(7);
    };

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
        axios.get('http://213.32.6.121:')
            .then(response => {
                setRestos(response.data.name)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const navigate = useNavigate();

    const navigateToRestaurantMenu = (restaurantId) => {
        const restaurantMenuUrl = `/restaurant/${encodeURIComponent(restaurantId)}/menu`;
        navigate(restaurantMenuUrl);
    };

    return (
        <main className="h-screen w-full flex flex-col items-center">
            {!isMobile ? (
                <div className="h-screen w-full flex flex-col items-center">
                    <HeaderDesktop isAuthenticated={isAuthenticatedLocal} articlesCount={isArticlesCountLocal} />
                    <div className="w-full flex flex-row flex-wrap h-2/5 space-x-2">
                        {categories.map((category, index) => (
                            <Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={handleCategoryClick(category.name)} />
                        ))}
                    </div>
                    <div className="grid  grid-cols-5 gap-3 justify-center items-center h-4/5">
                        {filteredRestos.map((resto, index) => (
                            <RestoCard key={index} onClick={() => console.log(resto.name)} restoName={resto.name} restoImg={resto.img} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="h-screen w-full flex flex-col items-center">
                    <HeaderMobile />
                    <div className="w-full grid grid-cols-4 gap-1.5 h-1/5">
                        {categories.slice(0, displayCount).map((category, index) => (
                            <Category key={index} src={catImgEnum[category.name]} catName={category.name} onClick={handleCategoryClick(category.name)} />
                        ))}
                        {categories.length > 7 && !isExpanded && (
                            <button className="bg-transparent flex flex-col items-center        p-2"
                                    onClick={handleShowMore}>
                                <div
                                    className="place-content-center justify-center p-4 rounded-xl ">
                                    <Icon path={mdiPlusBox} size={1}/>
                                </div>
                                <h5 className="text-center text-xs md:text-sm font-semibold">Afficher plus</h5>
                            </button>
                        )}
                        {isExpanded && (
                            <button className="bg-transparent flex flex-col items-center        p-2"
                                    onClick={handleShowLess}>
                                <div
                                    className="place-content-center justify-center p-4 rounded-xl ">
                                    <Icon path={mdiMinusBox} size={1}/>
                                </div>
                                <h5 className="text-center text-xs md:text-sm font-semibold">Afficher moins</h5>
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-3 justify-center items-center h-4/5">
                        {filteredRestos.map((resto, index) => (
                            <RestoCard key={index} onClick={() => navigateToRestaurantMenu(resto.id)} restoName={resto.name} restoImg={resto.img} />
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </main>
    );
}
