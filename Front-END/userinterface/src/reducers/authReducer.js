const initialState = {
	isAuthenticated: !!localStorage.getItem('accessToken'),
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken')
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthenticated: true,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken
			};
		case 'LOGOUT':
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return {
				...state,
				isAuthenticated: false,
				accessToken: null,
				refreshToken: null
			};
		default:
			return state;
	}
};

export default authReducer;
