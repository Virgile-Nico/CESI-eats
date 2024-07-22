import axios from "axios";
let Token
let ID

export const login = async (email, password) => {
		try {
			const requestBody = {
				MAIL: email,
				PASSWORD: password
			};

			console.log(JSON.stringify(requestBody));

			const response = await axios.post('http://213.32.6.121:3020/login?type=restaurant', JSON.stringify(requestBody), {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			console.log(response.data);
			const { accessToken, userID } = response.data;
			Token = accessToken
			ID = userID
			//const user = { mail: userID.mail, ID: userID.ID };

			loginSuccess(accessToken);
			//dispatch(setUser(user));
		} catch (error) {
			console.error('Login error:', error);
		}
};

export const logout = () => {
	localStorage.removeItem('accessToken');

	return {
		type: 'LOGOUT'
	};
};

export const loginSuccess = (accessToken) => {
	if (accessToken) {
		localStorage.setItem('accessToken', accessToken);
	}

	return {
		type: 'LOGIN_SUCCESS',
		accessToken,
	};
};
export const isLoggedIn = () => {
	const accessToken = localStorage.getItem('accessToken');
  	return !!accessToken
}
