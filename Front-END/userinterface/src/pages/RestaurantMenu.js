import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemMenu from '../components/ItemMenu';
import {useParams} from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile";
import HeaderDesktop from "../components/HeaderDesktop";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../actions/cartActions";
import Footer from "../components/Footer";

export default function RestaurantMenu() {
	const articlesCount = useSelector(state => state.articlesCount);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(isAuthenticated);
	const [isArticlesCountLocal, setIsArticlesCountLocal] = useState(articlesCount);
	useEffect(() => {
		setIsAuthenticatedLocal(isAuthenticated);
		setIsArticlesCountLocal(articlesCount);
	}, [isAuthenticated, articlesCount]);
	const { restaurantId } = useParams(); // Get the restaurant id from the URL using useParams
	const [menuItems, setMenuItems] = useState([{name: '', description: '', price: '', image: ''}]);
	const isMobile = window.innerWidth <= 600;
	const cartItems = useSelector(state => state.cartItems);
	const dispatch = useDispatch();
	const [isVisible, setIsVisible] = useState(false);

	const addInCart = (itemName, itemPrice) => {
		dispatch(addToCart({ name: itemName, price: itemPrice }));
		setIsVisible(true);
		setTimeout(() => { setIsVisible(false) }, 1500);
	};

	useEffect(() => {
		setMenuItems([
			{name: 'Pizza Margherita', description: 'Tomate, mozzarella, basilic', price: '8.50', image: 'https://img.cuisineaz.com/660x660/2013/12/20/i18445-margherite.jpeg'},
			{name: 'Pizza Reine', description: 'Tomate, mozzarella, jambon, champignons, olives', price: '9.50', image: 'https://colmar.coeur-paysan.com/wp-content/uploads/2022/05/CP-Colmar-Pizza-reine.png'},
			{name: 'Pizza 4 fromages', description: 'Tomate, mozzarella, gorgonzola, emmental, chèvre', price: '10.50', image: 'https://assets.afcdn.com/recipe/20200506/110673_w1024h768c1cx3120cy2080cxt0cyt0cxb6240cyb4160.webp'},
			{name: 'Pizza Végétarienne', description: 'Tomate, mozzarella, poivrons, oignons, champignons, olives', price: '11.50', image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/E3262F2D-E223-4172-BA55-46A609BD8240/Derivates/15442077-24d9-4fbc-b0ff-abb9244e28e4.jpg'},
			{name: 'Pizza Calzone', description: 'Tomate, mozzarella, jambon, champignons, olives, oeuf', price: '12.50', image: 'https://img.passeportsante.net/1200x675/2022-10-07/shutterstock-413678740.webp'},
			{name: 'Pizza 4 saisons', description: 'Tomate, mozzarella, jambon, champignons, artichauts, olives', price: '13.50', image: 'https://lh3.googleusercontent.com/proxy/AKN40nia7vafwVJqzLhzWnwALQ0IC9SLnvyJyrj3iAKIsjlKD0PtyTMX6_RdSQhwPJL6L0nvraeCSake-TGLo4aUi3EZNanpC2VI3S8durKRCTIdhWI'},
			{name: 'Pizza Hawaïenne', description: 'Tomate, mozzarella, jambon, ananas, olives', price: '14.50', image: 'https://assets.afcdn.com/recipe/20170328/63885_w1024h576c1cx1500cy1000.webp'},
			{name: 'Pizza Orientale', description: 'Tomate, mozzarella, merguez, poivrons, oignons, olives', price: '15.50', image: 'https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F5ad52111-03c7-44c1-89d4-34d5cc3bcf6a.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgUm91bGllci1UdXJpb3QvIFN1Y3LDqSBTYWzDqSAvIEN1aXNpbmUgQWN0dWVsbGU%3D/pizza-orientale.jpeg'},
			{name: 'Pizza Royale', description: 'Tomate, mozzarella, foie gras, magret de canard, champignons, olives', price: '16.50', image: 'https://img.cuisineaz.com/660x660/2016/06/30/i87982-pizza-royale.jpg'},
			{name:'Pizza Pepperoni', description:'Tomate, mozzarella, pepperoni, olives', price:'17.50', image:'https://dxpulwm6xta2f.cloudfront.net/eyJidWNrZXQiOiJhZGMtZGV2LWltYWdlcy1yZWNpcGVzIiwia2V5IjoicGl6emFfcGVwcGVyb25pLmpwZyIsImVkaXRzIjp7ImpwZWciOnsicXVhbGl0eSI6ODB9LCJwbmciOnsicXVhbGl0eSI6ODB9LCJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'},
		])
	}, []);


	/*useEffect(() => {
		// Make a request to your API to fetch the restaurant menu items
		axios.get(`http://213.32.6.121:3023/login?type=user&?ID=${restaurantId}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				setMenuItems(response.data);
			})
			.catch(error => {
				console.error('Error fetching menu items:', error);
			});
	}, [restaurantId]); // Execute the effect whenever the restaurant name changes
*/
	return (
		<main className="h-screen w-full flex flex-col space-y-4 items-center">
			{isMobile ? <HeaderMobile /> : <HeaderDesktop isAuthenticated={isAuthenticatedLocal} articlesCount={isArticlesCountLocal} />}
			<h1 className="text-3xl text-center font-bold mb-4">Menu</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4 w-full items-center place-items-center">
				{menuItems.map((item, index) => (
					<ItemMenu
						key={index}
						itemName={item.name}
						itemDescription={item.description}
						itemPrice={item.price}
						itemImg={item.image}
						onclick={addInCart}
					/>
				))}
			</div>
			{isVisible && (<div className="flex w-96 shadow-lg rounded-lg" >
				<div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center" >
					<svg xmlns="http://www.w3.org/2000/svg"
					     className="text-white fill-current"
					     viewBox="0 0 16 16"
					     width="20"
					     height="20" >
						<path fill-rule="evenodd"
						      d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" ></path >
					</svg >
				</div >
				<div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200" >
					<div >Article ajouté au panier</div >
					<button >
						<svg xmlns="http://www.w3.org/2000/svg"
						     className="fill-current text-gray-700"
						     viewBox="0 0 16 16"
						     width="20"
						     height="20" >
							<path fill-rule="evenodd"
							      d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" ></path >
						</svg >
					</button >
				</div >
			</div >)}
			<Footer/>
		</main >
	);
}