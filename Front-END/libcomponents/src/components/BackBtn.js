import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

function back(){
	window.history.back();
}

export default function BackBtn() {
	return (
		<button onClick={back} className="flex flex-row w-50 h-50 bg-gray-100 shadow rounded-lg py-2 px-8">
			<Icon path={mdiArrowLeft} size={1}/>
			<p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-gray-800">Retour</p>
		</button>
	);
}