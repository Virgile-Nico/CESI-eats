import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo/logo_slogan.png';import { connect } from 'react-redux';

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

function Splash({isAuthenticated}) {
	const navigate = useNavigate();
	const isMobile = window.innerWidth <= 600;

	useEffect(() => {
		const timer = setTimeout(() => {
			if(isMobile)
				if(isAuthenticated)
					navigate('/home');
				else
					navigate('/login');
			else
				navigate('/home');
		}, 1500);

		return () => clearTimeout(timer);
	}, [navigate, isMobile]);

	return (
		<main className="h-screen w-full flex flex-col justify-center items-center bg-[#142328]">
			<img alt="logo" src={Logo} className="bg-white h-1/3 md:h-1/2 w-1/2 md:w-1/3" />
		</main>
	);
}

export default connect(mapStateToProps)(Splash);