import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo/logo_slogan.png';
import { isLoggedIn } from '../actions/authActions';

export default function Splash() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			if(isLoggedIn()) {
				navigate('/home');
			} else {
				navigate('/login');
			}
		}, 1500);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<main className="h-screen w-full flex flex-col justify-center items-center bg-[#142328]">
			<img alt="logo" src={Logo} className="bg-white h-1/3 md:h-1/2 w-1/2 md:w-1/3" />
		</main>
	);
}