export default function CardPayment({cardNumber, username, date, cvc}){
    return(
        <div className="flex flex-col text-sm text-gray-700 my-2">
            <p className="font-semibold">Numéro de carte : {cardNumber}</p>
            <p className="font-semibold">{username}</p>
            <div className="flex flex-row space-x-2">
                <p className="">Date d'expiration : {date}</p>
                <p className="">Code cvc : {cvc}</p>
            </div>
        </div>
    )
}