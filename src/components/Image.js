import React, {useState} from 'react';

import placeholder from '../assets/img/placeholder.png';

export default function Image({src, optional, className}) {
	const [hidden, setHidden] = useState(src ? false : true);
	const [source, setSource] = useState(src ? src : (optional ? null : placeholder));
	const [error, setError] = useState(false);

	let style;
	if(hidden)
		style = {display: 'none'};

	// harus ada alt agar tidak warning
	return (
		<div className={className} style={style}>
			<img alt="" src={source} onError={(e) => {
			if(!error && !optional) {
				setError(true);
				setSource(placeholder);
			}
			else
				setHidden(true);
		}} />
		</div>
	);
}