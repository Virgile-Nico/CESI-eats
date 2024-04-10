import Burger from "../assets/img/categories/burger.png";

export default function Category({src, catName}) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-gray-300 place-content-center justify-center p-4 rounded-xl">
                <img src={src} alt="..." className="h-16 w-16" />
            </div>
            <h4 className="text-center text-lg font-semibold">{catName}</h4>
        </div>
    )
}