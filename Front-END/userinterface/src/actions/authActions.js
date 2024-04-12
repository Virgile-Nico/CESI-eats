import { setUser } from "./userAction";
import { useDispatch } from "react-redux";
import axios from "axios";

export const login = (email, password) => {
	return async dispatch => {
		try {
			const requestBody = {
				MAIL: email,
				PASSWORD: password
			};

			console.log(JSON.stringify(requestBody));

			const response = await axios.post('http://213.32.6.121:3020/login?type=user', JSON.stringify(requestBody), {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			console.log(response.data);
			const { accessToken, refreshToken, userID } = response;
			//const user = { mail: userID.mail, ID: userID.ID };

			dispatch(loginSuccess(accessToken, refreshToken));
			//dispatch(setUser(user));
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
