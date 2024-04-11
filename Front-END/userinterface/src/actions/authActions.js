import { setUser } from "./userAction";
import { useDispatch } from "react-redux";
import axios from "axios";

export const login = (email, password) => {
	return async dispatch => {
		try {
			const requestBody = {
				email: email,
				password: password
			};

			const response = await axios.post('http://213.32.6.121:3020/login?type=user', requestBody);

			const { accessToken, refreshToken, userID } = response.data;

			dispatch(loginSuccess(accessToken, refreshToken));
			dispatch(setUser(userID));
		} catch (error) {
			console.error('Login error:', error);
		}
	};
};

export const logout = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');

	return {
		type: 'LOGOUT'
	};
};

export const loginSuccess = (accessToken, refreshToken) => {
	if (accessToken && refreshToken) {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
	}

	return {
		type: 'LOGIN_SUCCESS',
		accessToken,
		refreshToken,
	};
};
