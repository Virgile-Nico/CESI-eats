import Logo from '../assets/logo/logo.png';
import Icon from '@mdi/react';
import { useNavigate } from "react-router-dom";
import { mdiAccount, mdiAccountPlus, mdiCart, mdiCircleSmall, mdiMagnify } from "@mdi/js";
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    articlesCount: state.articlesCount
});

function HeaderDesktop() {
    const navigate = useNavigate();
    const { isAuthenticated, articlesCount } = mapStateToProps;

    return (
        <header className="w-full h-20 flex justify-between items-center px-6">
            {isAuthenticated ? (
                <>
                    <div className="flex items-center">
                        <img alt="logo" src={Logo} className="h-24 w-18"/>
                    </div>
                    <div className="flex flex-row h-10 w-1/3 mx-4 rounded-full bg-gray-300 p-2">
                        <input
                            type="text"
                            placeholder="Rechercher"
                            className="border-none bg-transparent w-full text-lg text-gray-900 focus:outline-none"
                        />
                        <Icon path={mdiMagnify} size={1}/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="flex flex-row space-x-2 w-50 bg-neutral-900 shadow rounded-3xl py-2 px-8 text-gray-100 hover:bg-neutral-700"
                            onClick={() => navigate('/cart')}>
                            <Icon className="my-auto" path={mdiCart} size={1}/>
                            <p className="m-auto inset-0 text-lg font-semibold text-center">Panier</p>
                            <Icon className="my-auto" path={mdiCircleSmall} size={1}/>
                            <p className="m-auto inset-0 text-lg font-semibold text-center">{articlesCount}</p>
                        </button>
                        <button onClick={() => navigate('/profile')}
                                className="flex flex-row space-x-2 w-50 bg-gray-100 shadow rounded-3xl py-2 px-8 hover:bg-gray-300">
                            <Icon className="my-auto" path={mdiAccountPlus} size={1}/>
                            <p className="m-auto inset-0 text-lg font-semibold text-center text-gray-800">Mon compte</p>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center">
                        <img alt="logo" src={Logo} className="h-24 w-18"/>
                    </div>
                    <div className="flex flex-row h-10 w-1/3 mx-4 rounded-full bg-gray-300 p-2">
                        <input
                            type="text"
                            placeholder="Rechercher"
                            className="border-none bg-transparent w-full text-lg text-gray-900 focus:outline-none"
                        />
                        <Icon path={mdiMagnify} size={1}/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="flex flex-row space-x-2 w-50 bg-neutral-900 shadow rounded-3xl py-2 px-8 text-gray-100 hover:bg-neutral-700"
                            onClick={() => navigate('/cart')}>
                            <Icon className="my-auto" path={mdiCart} size={1}/>
                            <p className="m-auto inset-0 text-lg font-semibold text-center">Panier</p>
                            <Icon className="my-auto" path={mdiCircleSmall} size={1}/>
                            <p className="m-auto inset-0 text-lg font-semibold text-center">{articlesCount}</p>
                        </button>
                        <button onClick={() => navigate('/login')}
                                className="flex flex-row space-x-2 w-50 bg-primary-500 shadow-lg rounded-3xl py-2 px-8 hover:bg-primary-300 hover:shadow-none">
                            <Icon className="my-auto" path={mdiAccount} size={1} />
                        <p className="m-auto inset-0 text-lg font-semibold text-center text-gray-800">Se connecter</p>
                    </button>
                    <button onClick={() => navigate('/sign-up')}
                            className="flex flex-row space-x-2 w-50 bg-gray-100 shadow rounded-3xl py-2 px-8 hover:bg-gray-300">
                        <Icon className="my-auto" path={mdiAccountPlus} size={1} />
                        <p className="m-auto inset-0 text-lg font-semibold text-center text-gray-800">S'inscrire</p>
                    </button>
                </div>
            </>)}
        </header>
    )
}

export default connect(mapStateToProps)(HeaderDesktop);
