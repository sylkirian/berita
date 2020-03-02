import React, {useState} from 'react';

import placeholder from '../assets/img/placeholder.png';

export default function Image({src}) {
	const [source, setSource] = useState(src ? src : placeholder);
	const [error, setError] = useState(false);

	// harus ada alt agar tidak warning
	return (
		<img alt="" src={source} onError={() => {
			if(!error) {
				setError(true);
				setSource(placeholder);
			}
		}} />
	);
}