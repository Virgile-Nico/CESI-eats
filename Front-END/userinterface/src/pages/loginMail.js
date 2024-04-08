import Bowl from '../assets/img/bowl_logo.png';
import Logo from '../assets/logo/logo_slogan.png';
import Icon from '@mdi/react';
import {mdiEye, mdiEyeOff} from "@mdi/js";
import {useState} from "react";

export default function LoginMail() {
	// Check if the screen width is less than or equal to 600 pixels
	const isMobile = window.innerWidth <= 600;
	const [show, setShow] = useState(false);
	const [password, setPassword] = useState('');

	return (
		<main className="h-screen w-full flex flex-col items-center">
			{/* Render the image only if the screen width is considered mobile */}
			{isMobile && (
				<div className="flex flex-col space-y-10" >
					<div className="flex flex-col space-y-4" >
						<img alt="bowl"
						     src={Bowl}
						     className="w-full h-8/12" />
						<h5 className="text-xl font-semiboldbold mt-2 mx-4" >Connectez-vous avec votre email :</h5 >
						<div className="mx-4" >
							<label htmlFor="UserEmail"
							       className="sr-only" > Email </label >

							<input
								type="email"
								id="UserEmail"
								placeholder="Entrer votre adresse mail"
								className="w-full h-10 rounded-md border-gray-200 bg-gray-200 px-4 shadow-sm sm:text-sm"
							/>
						</div >
						<button className="text-sm text-end mx-4 underline active:no-underline" >Je n'ai pas de compte
						</button >
					</div >
					<button className="flex flex-row w-1/2 self-center h-10 bg-primary-500 shadow rounded-3xl py-2 px-8 active:bg-primary-300" >
						<p className="m-auto inset-0 text-xl font-bold text-center text-gray-800" >Se connecter</p >
					</button >
				</div >
			)}
			{ !isMobile && (
				<div className="flex flex-col w-full space-y-10 py-4 place-items-center my-auto" >
					<img alt="bowl"
					     src={Logo}
					     className="h-9/12 w-1/4" />
					<div className="flex flex-row h-12 w-1/4 rounded-md bg-gray-300 p-2" >
						<input
							type={show ? 'text' : 'password'}
							placeholder="Entrer votre mail"
							className="border-none bg-transparent w-full text-lg text-gray-900 focus:outline-none"
						/>
					</div >
					<div className="flex flex-row h-12 w-1/4 rounded-md bg-gray-300 p-2" >
						<input
							type={show ? 'text' : 'password'}
							placeholder="Entrer votre mot de passe"
							className="border-none bg-transparent w-full text-lg text-gray-900 focus:outline-none"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<button className="bg-transparent"
						        onClick={() => setShow(!show)} >
							{show ? (
								<Icon path={mdiEye}
								      size={1}
								      color="currentColor" />
							) : (
								<Icon path={mdiEyeOff}
								      size={1}
								      color="currentColor" />
							)}
						</button >
					</div >
					<button className="flex flex-row w-1/6 h-10 bg-primary-500 shadow rounded-3xl py-2 px-8 active:bg-primary-300" >
						<p className="m-auto inset-0 text-xl font-bold text-center text-gray-800" >Se connecter</p >
					</button >
				</div >
			)}
		</main >
	)
}