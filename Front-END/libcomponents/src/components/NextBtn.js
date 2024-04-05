import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';



export default function NextBtn({onClick, text}) {
	return (
		<button className="flex flex-row space-x-2 w-50 h-50 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300" onClick={onClick}>
			<p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">{text}</p>
			<Icon className="my-auto" path={mdiArrowRight} size={1} />
		</button>
	);
}