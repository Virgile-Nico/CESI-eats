import Icon from "@mdi/react";
import {mdiCloseBox} from "@mdi/js";
import React from "react";

export default function NotificationFeedback({condition, setNotifVisible, textFail, textSuccess}) {
	return (
		<div
			className="flex flex-col space-y-4 mx-2 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-transparent" >
			<div className="flex flex-col p-8 bg-gray-100 border-2 border-gray-200 shadow-2xl rounded-2xl" >
				<div className="flex items-center justify-between" >
					{condition ? (
						<div className="flex items-center" >
							<div className="flex flex-col ml-3" >
								<div className="font-bold text-lg md:text-lg text-green-700" >
									{textSuccess}
								</div >
							</div >
						</div >
					) : (
						<div className="flex items-center" >
							<div className="flex flex-col ml-3" >
								<div className="font-bold text-lg md:text-lg text-red-700" >{textFail}
								</div >
							</div >
						</div >
					)}
					<button
						onClick={() => setNotifVisible(false)}
						className="flex-no-shrink bg-transparent px-5 ml-4 py-2 text-sm text-red-700 hover:text-red-400 font-medium tracking-wider rounded-full"
					>
						<Icon path={mdiCloseBox}
						      size={2} />
					</button >
				</div >
			</div >
		</div >
	)
}