export default function Address({street, zipCode, city}){
    return(
        <div className="flex flex-col text-sm text-gray-700 my-2">
            <p className="font-semibold">{street},</p>
            <div className="flex flex-row space-x-2">
                <p className="">{zipCode}</p>
                <p className="">{city}</p>
            </div>
        </div>
    )
}