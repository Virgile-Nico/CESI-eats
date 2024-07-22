import resto from '../assets/img/restaurateur.png';
import Bowl from '../assets/img/resto_mobile.png';
import Icon from '@mdi/react';
import {mdiCloseBox, mdiEye, mdiEyeOff} from "@mdi/js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { login } from '../actions/authActions';

export default function Login() {
	// Check if the screen width is less than or equal to 600 pixels
	const isMobile = window.innerWidth <= 600;
	const [show, setShow] = useState(false); // State to store the visibility of the password
	const [password, setPassword] = useState(''); //State to store the email value
	const [notifVisible, setNotifVisible] = useState(false); // State to store the visibility of the notification
	const [email, setEmail] = useState(''); // State to store the email value
	const [isValid, setIsValid] = useState(true); // State to store the validity of the email

	const navigate = useNavigate();

	// Function to handle changes in the input value
	const handleChange = (event) => {
		const { value } = event.target;
		setEmail(value);

		// Regular expression to validate the email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setIsValid(emailRegex.test(value));
	};

	return (
		<main className="h-screen w-full flex flex-col items-center">
			{/* Render the image only if the screen width is considered mobile */}
			{isMobile && (
				<div className="flex flex-col space-y-8" >
					<div className="flex flex-col space-y-4">
						<img alt="bowl"
							 src={Bowl}
							 className="w-full h-8/12"/>
						<h5 className="text-xl font-semiboldbold mt-2 mx-4">Connectez-vous avec votre email :</h5>
						<div className="mx-4">
							<label htmlFor="UserEmail"
								   className="sr-only"> Email </label>

							<input
								type="email"
								id="UserEmail"
								value={email}
								onChange={handleChange}
								placeholder="Entrer votre adresse email"
								className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
							/>
							{!isValid && <p className="text-red-700 bg-transparent">Veuillez entrer une adresse email valide.</p>}
						</div>
						<div className="flex flex-row h-10 mx-4 rounded-md bg-gray-300 p-2">
							<input
								type={show ? 'text' : 'password'}
								placeholder="Entrer votre mot de passe"
								className="border-none bg-transparent w-full text-lg text-gray-900 focus:outline-none"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<button className="bg-transparent"
									onClick={() => setShow(!show)}>
								{show ? (
									<Icon path={mdiEye}
										  size={1}
										  color="currentColor"/>
								) : (
									<Icon path={mdiEyeOff}
										  size={1}
										  color="currentColor"/>
								)}
							</button>
						</div>
						<button className="text-sm text-end mx-4 underline active:no-underline">Je n'ai pas de compte Restaurateur
						</button>
					</div>
					<button
						onClick={async () => {
							await login(email, password); 
							navigate('/home')
						}}
						className="flex flex-row w-1/2 self-center h-10 bg-primary-500 shadow rounded-3xl py-2 px-8 active:bg-primary-300">
						<p className="m-auto inset-0 text-xl font-bold text-center text-gray-800">Se connecter</p>
					</button>
				</div>
			)}
			{!isMobile && (
				<div className="flex flex-col w-full space-y-10 py-4 place-items-center my-auto">
					<img alt="resto"
							 src={resto}
							 className="w-full h-7/12"/>
					<div className="flex flex-col w-1/4 rounded-md">
						<input
							type="email"
							id="UserEmail"
							value={email}
							onChange={handleChange}
							placeholder="Entrer votre adresse email"
							className="w-full h-12 rounded-md border-gray-300 bg-gray-300 px-2 text-lg shadow-md focus:outline-none"
						/>
						{!isValid && <p className="text-red-700 bg-transparent">Veuillez entrer une adresse email valide.</p>}
					</div>
					<div className="flex flex-row h-12 w-1/4 rounded-md bg-gray-300 p-2 shadow-md">
						<input
							type={show ? 'text' : 'password'}
							placeholder="Entrer votre mot de passe"
							className="border-none bg-transparent w-full px-2 text-lg text-gray-900 focus:outline-none"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<button className="bg-transparent hover:text-gray-800"
								onClick={() => setShow(!show)}>
							{show ? (
								<Icon path={mdiEye}
									  size={1}
									  color="currentColor"/>
							) : (
								<Icon path={mdiEyeOff}
									  size={1}
									  color="currentColor"/>
							)}
						</button>
					</div>
					<button type="button" onClick={() => navigate('/sign-up')} className="text-sm text-end mx-4 underline active:no-underline">Je n'ai pas de compte Restaurateur
					</button>
					<button
						onClick={async () => {
							await login(email, password); 
							navigate('/home')
						}}
						className="flex flex-row w-1/6 h-10 bg-primary-500 shadow rounded-3xl py-2 px-8 active:bg-primary-300">
						<p className="m-auto inset-0 text-xl font-bold text-center text-gray-800">Se connecter</p>
					</button>
				</div>
			)}
			{notifVisible && (
				<div
					className="flex flex-col space-y-4 mx-2 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-transparent">
					<div className="flex flex-col p-8 bg-gray-100 border-2 border-gray-200 shadow-2xl rounded-2xl">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="flex flex-col ml-3">
									<div className="font-bold text-lg md:text-lg">Connexion impossible</div>
									<p className="text-sm md:text-md text-gray-700 leading-none mt-1">
										Email ou mot de passe incorrect
									</p>
								</div>
							</div>
							<button
								onClick={() => setNotifVisible(false)}
								className="flex-no-shrink bg-transparent px-5 ml-4 py-2 text-sm text-red-700 hover:text-red-400 font-medium tracking-wider rounded-full"
							>
								<Icon path={mdiCloseBox} size={2} />
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}