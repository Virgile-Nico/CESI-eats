export const setUser = (user) => {
	// Enregistrer l'utilisateur dans le localStorage
	localStorage.setItem('user', JSON.stringify(user));

	return {
		type: 'SET_USER',
		user
	};
};

export const clearUser = () => {
	// Supprimer l'utilisateur du localStorage
	localStorage.removeItem('user');

	return {
		type: 'CLEAR_USER'
	};
};
