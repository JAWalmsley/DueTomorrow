const shortMonth: string =
    '((jan)|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|dec)';
const twoNumbers: string = '\\d{1,2}';

export class DateParseError extends Error {
    constructor(message = ' ') {
        super(message);
    }
}

const shortMonthNumbers = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
};



function shortMonthdateNumber(dateStr: string): Date {
    let monthName: string = dateStr.match(new RegExp(shortMonth))![0];
    let dateNumber: string = dateStr.match(new RegExp(twoNumbers))![0];
    if (dateNumber.length === 1) {
        dateNumber = '0' + dateNumber;
    }
    let currentYear: number = new Date().getFullYear();
    let monthNum: number = shortMonthNumbers[monthName];

    // Making a date object with day 0 returns a date with the last day of that month. This is exclusively for february in leap years :)
    if (parseInt(dateNumber) > new Date(currentYear, monthNum, 0).getDate()) {
        throw new DateParseError('Month num greater than month');
    }
    console.log(`${currentYear}-${monthNum}-${dateNumber}T00:00:00.000Z`);
    return new Date(`${currentYear}-${monthNum}-${dateNumber}T00:00:00.000Z`);
}

export function parseDate(dateStr: string): Date {
    dateStr = dateStr.toLowerCase();
    // jan 01
    if (new RegExp(`${shortMonth} ${twoNumbers}`).test(dateStr)) {
        return shortMonthdateNumber(dateStr);
    }
    throw new DateParseError('Did not match any known date format');
}
