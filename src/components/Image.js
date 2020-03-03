import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import placeholder from '../assets/img/placeholder.png';

const ImageBox = styled.div`
	overflow: hidden;
`

export default function Image({src, optional, className}) {
	const [source, setSource] = useState();
	const [error, setError] = useState(false);

	useEffect(() => {
		setSource(src);
	}, [src]);

	// harus ada alt agar tidak warning
	if(source) {
		return (
			<ImageBox className={className}>
				<img alt="" src={source} onError={(e) => {
				if(!error && !optional) {
					setError(true);
					setSource(placeholder);
				}
				else
					setSource(null);
			}} />
			</ImageBox>
		);
	}
	else
		return null;
}