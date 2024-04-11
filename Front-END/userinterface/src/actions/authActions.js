import axios from 'axios';
import {setUser} from "./userAction";
import {useDispatch} from "react-redux";

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

export const loginSuccess = (accessToken, refreshToken, userID) => {
	if (accessToken && refreshToken) {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
	}

	const dispatch = useDispatch();

	dispatch(setUser(userID));

	return {
		type: 'LOGIN_SUCCESS',
		accessToken,
		refreshToken
	};
};
