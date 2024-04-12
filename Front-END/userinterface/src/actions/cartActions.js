export const addToCart = (item) => {
	const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
	cartItems.push(item);
	localStorage.setItem('cartItems', JSON.stringify(cartItems));

	const articlesCount = cartItems.length;
	localStorage.setItem('articlesCount', String(articlesCount)); // Convert to string

	return {
		type: 'ADD_TO_CART',
		payload: item
	};
};

export const removeFromCart = (item) => {
	const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
	const updatedCartItems = cartItems.filter(cartItem => cartItem !== item);
	localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

	const articlesCount = updatedCartItems.length;
	localStorage.setItem('articlesCount', String(articlesCount)); // Convert to string

	return {
		type: 'REMOVE_FROM_CART',
		payload: item
	};
};

export const resetArticlesCount = () => ({
	type: 'RESET_ARTICLES_COUNT'
});

export const emptyCart = () => {
	localStorage.removeItem('cartItems'); // Supprimer tous les éléments du panier
	localStorage.setItem('articlesCount', '0'); // Réinitialiser le compteur d'articles à zéro

	return {
		type: 'EMPTY_CART'
	};
};
