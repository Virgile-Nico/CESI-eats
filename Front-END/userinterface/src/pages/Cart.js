import {decrementArticlesCount, emptyCart, removeFromCart, resetArticlesCount} from "../actions/cartActions";
import {useSelector} from "react-redux";
import HeaderMobile from "../components/HeaderMobile";
import HeaderDesktop from "../components/HeaderDesktop";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiCartMinus} from "@mdi/js";

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	articlesCount: state.articlesCount
});

const mapDispatchToProps = {
	decrementArticlesCount,
	resetArticlesCount,
	emptyCart,
	removeFromCart
};

export default function Cart() {
	const { isAuthenticated, articlesCount } = useSelector(mapStateToProps);
	const { emptyCart, removeFromCart } = mapDispatchToProps;
	const isMobile = window.innerWidth <= 600;
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		setArticles(JSON.parse(localStorage.getItem('cartItems')) || []);
	}, []);

	return(
		<main className="flex flex-col">
			{isMobile ? <HeaderMobile /> : <HeaderDesktop isAuthenticated={isAuthenticated} articlesCount={articlesCount} />}
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mt-8">Panier</h1>
				<div className="flex flex-col items-center justify-center mt-4">
					{articles > 0 ? (
						<div className="flex flex-col items-center justify-center">
							<p className="text-gray-700 font-semibold">{articlesCount} articles dans votre panier</p>
							{articles.map((article, index) => (
								<div key={index} className="flex flex-col items-center justify-center shadow w-full p-4">
									<div className="flex flex-row items-center justify-between" >
										<p className="text-gray-700 font-semibold" >{article.name}</p >
										<p className="text-gray-700 font-semibold" >{article.price}€</p >
									</div >
									<button onClick={() => removeFromCart(article)}
									        className="bg-gray-300 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded mt-4"><Icon path={mdiCartMinus} size={1} />
									</button>
								</div>
							))}
							<button onClick={emptyCart} className="bg-gray-300 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded mt-4">Vider le panier</button>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center">
							Votre panier est vide
						</div>
					)}
				</div>
			</div>
		</main>
	)
}