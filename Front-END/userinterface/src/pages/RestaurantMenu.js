import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemMenu from '../components/ItemMenu';
import {useParams} from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile";
import HeaderDesktop from "../components/HeaderDesktop";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../actions/cartActions";
import Footer from "../components/Footer";

// mapStateToProps function to map state to props
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	articlesCount: state.articlesCount
});

export default function RestaurantMenu() {
	const { isAuthenticated, articlesCount } = useSelector(mapStateToProps);
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
		// Make a request to your API to fetch the restaurant menu items
		axios.get(`api_url/${restaurantId}/menu`)
			.then(response => {
				setMenuItems(response.data);
			})
			.catch(error => {
				console.error('Error fetching menu items:', error);
			});
	}, [restaurantId]); // Execute the effect whenever the restaurant name changes

	return (
		<div className="container flex flex-col mx-auto py-8">
			{isMobile ? <HeaderMobile /> : <HeaderDesktop isAuthenticated={isAuthenticated} articlesCount={articlesCount} />}
			<h1 className="text-3xl font-bold mb-4">Restaurant Menu</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
		</div >
	);
}