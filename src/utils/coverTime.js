export const covertTimeToSecond = (days, hours, mins, secs) => {
	return secs * 1000 + mins * 1000 * 60 + hours * 1000 * 3600 + days * 1000 * 3600 * 24;
};

export const covertMsToTime = miliseconds => {
	const days =
		miliseconds / (1000 * 3600 * 24) >= 1 ? Math.floor(miliseconds / (1000 * 3600 * 24)) : 0;
	const daysRemainder = miliseconds % (1000 * 3600 * 24);
	const hours =
		daysRemainder / (1000 * 3600) >= 1 ? Math.floor(daysRemainder / (1000 * 3600)) : 0;
	const hoursRemainder = daysRemainder % (1000 * 3600);
	const minutes =
		hoursRemainder / (1000 * 60) >= 1 ? Math.floor(hoursRemainder / (1000 * 60)) : 0;
	const minutesRemainder = hoursRemainder % (1000 * 60);
	const seconds = minutesRemainder / 1000 >= 1 ? Math.floor(minutesRemainder / 1000) : 0;
	return [days, hours, minutes, seconds];
};
