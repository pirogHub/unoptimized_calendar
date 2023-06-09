import React, { Component } from "react"

const Arrow = ({ isRight }) => {

	return (
		<span

			className="cursor-pointer text-gray-600 mx-2" >

			<svg
				style={isRight ? { transform: "rotate(180deg)" } : {}}
				viewBox="0 0 5 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M4.8003 9.11849C4.53403 9.38475 4.10233 9.38475 3.83606 9.11849L0.1997 5.48212C-0.0665664 5.21586 -0.0665664 4.78415 0.1997 4.51789L3.83606 0.881524C4.10233 0.615257 4.53403 0.615257 4.8003 0.881524C5.06657 1.14779 5.06657 1.57949 4.8003 1.84576L1.64605 5.00001L4.8003 8.15425C5.06657 8.42052 5.06657 8.85222 4.8003 9.11849Z"
					fill="#93B1FF"
				/>
			</svg>
		</span>
	)
}


export default Arrow
