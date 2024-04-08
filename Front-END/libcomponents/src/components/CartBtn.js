import Icon from '@mdi/react';
import { mdiCart } from '@mdi/js';
import { mdiCircleSmall } from '@mdi/js';

export default function CartBtn({articlesCount, onClick}) {
	return (
		<button className="flex flex-row space-x-2 w-50 h-50 bg-neutral-900 shadow rounded-3xl py-2 px-8 text-gray-100 hover:bg-neutral-700" onClick={onClick} >
			<Icon className="my-auto" path={mdiCart} size={1} />
			<p className="m-auto inset-0 text-xl font-semibold text-center" >Panier</p >
			<Icon className="my-auto" path={mdiCircleSmall} size={1} />
			<p className="m-auto inset-0 text-xl font-semibold text-center" >{articlesCount}</p >
		</button >
	);
}