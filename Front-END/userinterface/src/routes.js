import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SuccessConnexion from "./pages/SuccessConnexion";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import RestaurantMenu from "./pages/RestaurantMenu";
import OrderHistory from "./pages/OderHistory";
import Cart from "./pages/Cart";


export const routes = [
	{
		name: "Splash",
		path: "/",
		element: <Splash />,
	},
	{
		name: "Login",
		path: "/login",
		element: <Login />,
	},
	{
		name: "SuccessConnexion",
		path: "/success-connexion",
		element: <SuccessConnexion />,
	},
	{
		name: "SignUp",
		path: "/sign-up",
		element: <SignUp />,
	},
	{
		name: "Home",
		path: "/home",
		element: <Home />,
		routes: [
			{
				name: "RestaurantMenu",
				path: "/restaurant/:restaurantId/menu",
				element: <RestaurantMenu />,
			},
		]
	},
	{
		name: "Profile",
		path: "/profile",
		element: <Profile />,
		routes: [
			{
				name: "Edit",
				path: "/edit",
				element: <Edit />,
			},
			{
				name: "OderHistory",
				path: "/order-history",
				element: <OrderHistory />,
			}
		],
	},
	{
		name: "Cart",
		path: "/cart",
		element: <Cart />,
	},
	{
		name: "NotFound",
		path: "*",
		element: <NotFound />,
	},
];

export const compileRoutes = (parentRoute, subRoutes) => {
	return subRoutes.flatMap(subRoute => {
		const newRoute = {
			...subRoute,
			path: parentRoute.path + subRoute.path,
			roles: (parentRoute.roles || []).concat(subRoute.roles || []),
		};
		const routes = subRoute.routes ? compileRoutes(newRoute, subRoute.routes) : [];
		return [newRoute, ...routes];
	});
};

export const getRoutes = () => {
	const parentRoute = {
		name: '',
		path: '',
	};
	return compileRoutes(parentRoute, routes);
};