export const loginSuccess = (accessToken, refreshToken) => ({
	type: 'LOGIN_SUCCESS',
	accessToken,
	refreshToken
});

export const logout = () => ({
	type: 'LOGOUT'
});
