import Icon from '@mdi/react';
import {mdiAccountPlus} from '@mdi/js';

export default function SignUpBtn({onClick}) {
	return (
		<button onClick={onClick} className="flex flex-row space-x-2 w-50 h-50 bg-gray-100 shadow rounded-3xl py-2 px-8 hover:bg-gray-300">
			<Icon className="my-auto" path={mdiAccountPlus} size={1} />
			<p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">S'inscrire</p>
		</button>
	);
}