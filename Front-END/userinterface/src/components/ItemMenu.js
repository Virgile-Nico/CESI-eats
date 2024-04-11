export default function ItemMenu({itemName, itemDescription, itemImg, itemPrice, onclick}) {
	const isMobile = window.innerWidth <= 600;

	return(
		<button className={isMobile ? "flex flex-row w-5/6 space-x-6 bg-transparent" : "flex flex-row w-1/3 items-center space-x-24 bg-transparent hover:bg-gray-200"} onClick={onclick}>
			<div className="flex flex-col space-y-4">
				<h3 className="text-2xl font-bold text-start text-gray-700">{itemName}</h3>
				<p className="text-justify text-sm text-gray-500">{itemDescription}</p>
				<p className="text-justify font-semibold text-sm text-gray-700">{itemPrice}€</p>
			</div>
			<img src={itemImg} alt="Burger" className="w-32" />
		</button>
	)
}