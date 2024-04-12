import Icon from "@mdi/react";
import {mdiCartPlus} from "@mdi/js";

export default function ItemMenu({itemName, itemDescription, itemImg, itemPrice, onclick}) {
	const isMobile = window.innerWidth <= 600;

	return(
		<div className={isMobile ? "flex flex-row w-5/6 items-center justify-between bg-transparent p-1.5" : "flex flex-row w-1/3 items-center justify-between bg-transparent p-1.5"}>
			<div className="flex flex-col space-y-4 mx-2">
				<h3 className="text-2xl font-bold text-start text-gray-700">{itemName}</h3>
				<p className="text-justify text-sm text-gray-500">{itemDescription}</p>
				<div className="flex flex-row space-x-4 items-center">
					<p className="text-justify font-semibold text-sm text-gray-700">{itemPrice}€</p>
					<button className="bg-gray-700 hover:bg-gray-200 rounded-xl text-primary-500 p-1" onClick={onclick}>
						<Icon path={mdiCartPlus} size={1} />
					</button>
				</div>
			</div>
			<img src={itemImg} alt="..." className="w-28"/>
		</div>
	)
}