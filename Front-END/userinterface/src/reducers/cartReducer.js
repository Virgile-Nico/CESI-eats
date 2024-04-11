const initialState = {
	articlesCount: parseInt(localStorage.getItem('articlesCount')) || 0,
	cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cartItems: [...state.cartItems, action.payload],
				articlesCount: state.articlesCount + 1
			};
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cartItems: state.cartItems.filter(item => item !== action.payload),
				articlesCount: state.articlesCount - 1
			};
		case 'RESET_ARTICLES_COUNT':
			return {
				...state,
				articlesCount: 0
			};
		case 'EMPTY_CART':
			return {
				...state,
				cartItems: [],
				articlesCount: 0
			};
		default:
			return state;
	}
};

export default cartReducer;
