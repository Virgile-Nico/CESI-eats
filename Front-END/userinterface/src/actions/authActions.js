import axios from 'axios';

export const login = (username, password) => {
	return async dispatch => {
		try {
			// Perform your API call for login using Axios
			const response = await axios.post('your-login-url', {
				username,
				password
			});

			const { accessToken, refreshToken } = response.data;

			// Dispatch the loginSuccess action with the tokens
			dispatch(loginSuccess(accessToken, refreshToken));
		} catch (error) {
			// Handle errors here
			console.error('Login error:', error);
		}
	};
};

export const logout = () => {
	// Supprimer les tokens du localStorage
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');

	return {
		type: 'LOGOUT'
	};
};


export const loginSuccess = (accessToken, refreshToken) => {
	// Enregistrer les tokens dans le localStorage ou sessionStorage
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);

	return {
		type: 'LOGIN_SUCCESS',
		accessToken,
		refreshToken
	};
};
