import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<main className="h-screen w-full flex flex-col justify-center items-center bg-[#142328]">
			<h1 className="font-extrabold text-white tracking-widest" style={{ fontSize: '10rem' }}>404</h1>
			<div className="bg-primary-500 px-2 text-md rounded rotate-12 absolute">
				Page Not Found
			</div>
			<button className="mt-5">
				<Link to="/" className="relative inline-block text-sm font-medium text-primary-500 group active:text-primary-200 focus:outline-none focus:ring">
					<span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>
					<span className="relative block px-8 py-3 bg-[#142328] border border-current">
            Accueil
          </span>
				</Link>
			</button>
		</main>
	);
}