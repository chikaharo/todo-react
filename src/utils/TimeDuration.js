import { covertTimeToSecond } from './coverTime';

export default class {
	constructor(days, hours, minutes, seconds) {
		this.days = days;
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
	}

	getTime() {
		return covertTimeToSecond(this.days, this.hours, this.minutes, this.seconds);
	}
}
