import { evaluate } from 'mathjs';

export default class Calculator {
	expandedOut = '';
	simpleOut = '0';
	addNumber(value: string) {
		this.simpleOut =
			this.simpleOut === '0' || this.simpleOut === 'error' ? value : this.simpleOut + value;
	}
	addOpparation(value: string) {
		if (
			this.expandedOut.includes('+') ||
			this.expandedOut.includes('-') ||
			this.expandedOut.includes('*') ||
			this.expandedOut.includes('/')
		) {
			this.expandedOut = `${evaluate(
				(this.expandedOut + this.simpleOut).replace(' =', '')
			).toString()}${value}`;
		} else {
			this.expandedOut = `${this.simpleOut}${value}`;
		}
		this.simpleOut = '0';
	}
	equals() {
		this.expandedOut = this.expandedOut + this.simpleOut;
		this.simpleOut = evaluate(this.expandedOut).toString();
		this.expandedOut = this.expandedOut + ' =';
	}
	manipulateOutput(value: string) {
		if (value === 'CE') {
			this.expandedOut = '';
			this.simpleOut = '0';
		}
		if (value === 'C') {
			this.simpleOut = '0';
		}
		if (value === 'DEL') {
			if (this.simpleOut[this.simpleOut.length - 2] === '.') {
				this.simpleOut = this.simpleOut.substring(0, this.simpleOut.length - 2);
			} else if (this.simpleOut.length !== 1) {
				this.simpleOut = this.simpleOut.substring(0, this.simpleOut.length - 1);
			} else {
				this.simpleOut = '0';
			}
		}
	}
	plusMinus() {
		this.simpleOut = (Number(this.simpleOut) * -1).toString();
	}
	addDecimal() {
		this.simpleOut += '.';
	}
}
