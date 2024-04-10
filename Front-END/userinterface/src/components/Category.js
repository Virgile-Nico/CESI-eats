import Burger from "../assets/img/categories/burger.png";

export default function Category({src, catName, onClick}) {
    const isMobile = window.innerWidth <= 600;
    return (
        <div>
            <button className="bg-transparent flex flex-col items-center p-2" onClick={onClick}>
                <div className="bg-gray-300 hover:bg-gray-200 place-content-center justify-center p-4 rounded-xl ">
                    {isMobile? (<img src={src} alt="..." className="h-8 w-8"/>) :(<img src={src} alt="..." className="h-16 w-16"/>)}
                </div>
                <h4 className="text-center text-xs md:text-sm font-semibold">{catName}</h4>
            </button>
        </div>
    )
}