import Icon from '@mdi/react';
import {mdiAccount} from '@mdi/js';

export default function BackBtn({onClick}) {
	return (
		<button onClick={onClick} className="flex flex-row space-x-2 w-50 h-50 bg-primary-500 shadow-xl rounded-3xl py-2 px-8 hover:bg-primary-300 hover:shadow-none">
			<Icon path={mdiAccount} size={1} />
			<p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Se connecter</p>
		</button>
	);
}