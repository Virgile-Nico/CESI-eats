import Logo from '../assets/logo/logo.png';

export default function HeaderDesktop({articlesCount}) {
    return(
        <header className="w-full h-20 flex justify-center items-center px-6">
            <div className="flex items-center">
                <img alt="logo" src={Logo} className="h-24 w-18"/>
            </div>
        </header>
    )
}