import defaultUser from '../assets/img/defaultUser.png';
export default function Avatar({ src, firstname, lastname}) {
    let path = src ? src : defaultUser

    return(
        <div className="w-2/3 my-6 px-8">
            <div className="px-6">
                <img alt="..." src={path} className="shadow-lg rounded-full mx-auto max-w-120-px" />
                <div className="pt-2 text-center">
                    <h5 className="flex flex-row space-x-2 text-xl font-bold text-gray-800"><span>{firstname} </span><span className="uppercase"> {lastname}</span></h5>
                </div>
            </div>
        </div>
    )
}