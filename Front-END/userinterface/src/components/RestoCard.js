export default function RestoCard({onClick, restoName, restoImg}) {
    return(
        <div>
            <button onClick={onClick} className="bg-transparent flex flex-col p-2 space-y-1 hover:animate-pulse">
                <img src={restoImg} alt="..." className="h-36 w-64 bg-transparent rounded-md" />
                <h4 className="text-lg font-bold text-start">{restoName}</h4>
            </button>
        </div>
    )
}