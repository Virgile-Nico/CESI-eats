import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Login from "./pages/Login";


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