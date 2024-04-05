import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

function back(){
	window.history.back();
}

export default function BackBtn({text}) {
	return (
		<button onClick={back} className="flex flex-row space-x-2 w-50 h-50 bg-gray-100 shadow rounded-3xl py-2 px-8 hover:bg-gray-300">
			<Icon path={mdiArrowLeft} size={1}/>
			<p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">{text}</p>
		</button>
	);
}    