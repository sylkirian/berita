const moment = require('moment');

require('moment/locale/id');

export function timeFromNow(date) {
	const now = moment();
	const time = moment(date, 'YYYY-MM-DDThh:mm:ss.000000Z');

	let str;
	const day = now.diff(time, 'days');

	if(day === 0)
		str = time.format('hh:mm');
	else if(day <= 7)
		str = time.format('dddd, hh:mm');
	else
		str = time.format('DD MMM YYYY, hh:mm');

	return str;
}