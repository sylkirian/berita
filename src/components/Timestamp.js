import React from 'react';

import {timeFromNow} from '../helpers/time';

export default function Timestamp({data}) {
	return (
		<div style={{color: 'grey'}}>
			{timeFromNow(data.created_at)}
			{data.updated_at !== data.created_at && ' (Diedit ' + timeFromNow(data.updated_at) + ')'}
			{' oleh ' + data.user.username}
		</div>
	);
}