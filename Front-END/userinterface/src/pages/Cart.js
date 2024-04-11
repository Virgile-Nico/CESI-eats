import {emptyCart, removeFromCart, resetArticlesCount} from "../actions/cartActions";
import {useSelector} from "react-redux";
import HeaderMobile from "../components/HeaderMobile";
import HeaderDesktop from "../components/HeaderDesktop";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiCartMinus} from "@mdi/js";
import NotificationFeedback from "../components/NotificationFeedback";
import axios from "axios";

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	articlesCount: state.articlesCount
});

const mapDispatchToProps = {
	resetArticlesCount,
	emptyCart,
	removeFromCart
};

export default function Cart() {
	const { isAuthenticated, articlesCount } = useSelector(mapStateToProps);
	const { emptyCart, removeFromCart } = mapDispatchToProps;
	const isMobile = window.innerWidth <= 600;
	const [articles, setArticles] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [isNotified, setIsNotified] = useState(false);

	useEffect(() => {
		setArticles(JSON.parse(localStorage.getItem('cartItems')) || []);
	}, []);

	if(isVisible)
		setTimeout(() => setIsVisible(false), 1500);

	if(isNotified)
		setTimeout(() => setIsNotified(false), 1500);

	const sendOrderToApi = async (articles) => {
		try {
			// Envoyez la liste des articles à l'API
			const response = await axios.post("URL_DE_VOTRE_API", { articles });

			// Vérifiez la réponse de l'API
			if (response.status === 200) {
				// Si la commande est passée avec succès, affichez un message de succès
				alert("Commande passée avec succès!");
			} else {
				// Sinon, affichez un message d'erreur
				alert("Une erreur s'est produite lors de la commande. Veuillez réessayer plus tard.");
			}
		} catch (error) {
			// En cas d'erreur lors de l'appel à l'API, affichez un message d'erreur
			console.error("Une erreur s'est produite lors de l'appel à l'API:", error);
			alert("Une erreur s'est produite lors de la commande. Veuillez réessayer plus tard.");
		}
	};

	const submitOrder = async () => {
		try {
			await sendOrderToApi(articles);
			// Si la commande est passée avec succès, vous pouvez effectuer d'autres actions ici
		} catch (error) {
			// En cas d'erreur lors de l'envoi de la commande, vous pouvez gérer l'erreur ici
			console.error("Une erreur s'est produite lors de la soumission de la commande:", error);
			// Vous pouvez également afficher un message d'erreur à l'utilisateur si nécessaire
			alert("Une erreur s'est produite lors de la soumission de la commande. Veuillez réessayer plus tard.");
		}
	};

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
									<button onClick={() => {
										removeFromCart(article);
										setIsVisible(true);
									}}
									        className="bg-gray-300 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded mt-4"><Icon path={mdiCartMinus} size={1} />
									</button>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center">
							Votre panier est vide
						</div>
					)}
				</div>
				<div className="flex flex-row items-center justify-between" >
					<button onClick={() => {
						emptyCart();
						setIsNotified(true);
					}}
					        className="bg-gray-300 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded mt-4" >Vider
					                                                                                                  le
					                                                                                                  panier
					</button >
					<button onClick={submitOrder} className="bg-primary-500 hover:bg-primary-300 text-gray-700 font-bold py-2 px-4 rounded mt-4 shadow" >Commander</button>
				</div >
				{isVisible && <NotificationFeedback condition={true}
				                                    setNotifVisible={setIsVisible}
				                                    textFail={'Article non retiré'}
				                                    textSuccess={'Article retiré'} />}
				{isNotified && <NotificationFeedback condition={true} setNotifVisible={setIsNotified} textFail={'Impossible de vider le panier'} textSuccess={'Panier vidé'} /> }
			</div>
		</main>
	)
}