import defaultUser from '../assets/img/defaultUser.png';
export default function Avatar({ src, firstname, lastname}) {
    let path = src ? src : defaultUser

    return(
        <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 my-6 px-8">
            <div className="px-6">
                <img alt="..." src={path} className="shadow-lg rounded-full mx-auto max-w-120-px" />
                    <div className="pt-2 text-center">
                        <h5 className="text-xl font-bold text-gray-800">{firstname} <span className="uppercase">{lastname}</span></h5>
                    </div>
            </div>
        </div>
    )
}