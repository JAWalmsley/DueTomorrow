const shortMonth: string =
    '((jan)|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|dec)';
const longMonth = '(january|february|march|april|may|june|july|august|september|october|november|december)';
const twoNumbers: string = '\\d{1,2}';
const fourNumbers: string = '\\d{4}';

export class DateParseError extends Error {
    constructor(message = ' ') {
        super(message);
    }
}

const monthToNumber = {
    "january": "01",
    "february": "02",
    "march": "03",
    "april": "04",
    "may": "05",
    "june": "06",
    "july": "07",
    "august": "08",
    "september": "09",
    "october": "10",
    "november": "11",
    "december": "12",
    "jan": "01",
    "feb": "02",
    "mar": "03",
    "apr": "04",
    "may": "05",
    "jun": "06",
    "jul": "07",
    "aug": "08",
    "sep": "09",
    "oct": "10",
    "nov": "11",
    "dec": "12"
};



function shortMonthdateNumber(dateStr: string): Date {
    console.log(dateStr);
    let monthName: string = dateStr.match(new RegExp(shortMonth))![0];
    let dateNumber: string = dateStr.match(new RegExp(twoNumbers))![0];
    if (dateNumber.length === 1) {
        dateNumber = '0' + dateNumber;
    }
    let currentYear: number = new Date().getFullYear();
    let monthNum: string = monthToNumber[monthName];

    // Making a date object with day 0 returns a date with the last day of that month. This is exclusively for february in leap years :)
    if (parseInt(dateNumber) > new Date(currentYear, parseInt(monthNum), 0).getDate()) {
        throw new DateParseError('Month num greater than month');
    }
    console.log(`${currentYear}-${monthNum}-${dateNumber}T00:00:00.000Z`);
    return nextFutureDate(new Date(`${currentYear}-${monthNum}-${dateNumber}T00:00:00.000Z`));
}

function shortMonthdateNumberYear(dateStr: string): Date {
    let monthName: string = dateStr.match(new RegExp(shortMonth))![0];
    let dateNumber: string = dateStr.match(new RegExp(twoNumbers))![0];
    let yearNumber: string = dateStr.match(new RegExp(fourNumbers))![0];
    if (dateNumber.length === 1) {
        dateNumber = '0' + dateNumber;
    }

    let monthNum: string = monthToNumber[monthName];

    // Making a date object with day 0 returns a date with the last day of that month. This is exclusively for february in leap years :)
    if (parseInt(dateNumber) > new Date(parseInt(yearNumber), parseInt(monthNum), 0).getDate()) {
        throw new DateParseError('Month num greater than month');
    }
    return new Date(`${yearNumber}-${monthNum}-${dateNumber}T00:00:00.000Z`);

}


function longMonthdateNumber(dateStr: string): Date {
    let monthName: string = dateStr.match(new RegExp(longMonth))![0];
    let dateNumber: string = dateStr.match(new RegExp(twoNumbers))![0];
    if (dateNumber.length === 1) {
        dateNumber = '0' + dateNumber;
    }
    let currentYear: number = new Date().getFullYear();
    let monthNum: string = monthToNumber[monthName];

    // Making a date object with day 0 returns a date with the last day of that month. This is exclusively for february in leap years :)
    if (parseInt(dateNumber) > new Date(currentYear, parseInt(monthNum), 0).getDate()) {
        throw new DateParseError('Month num greater than month');
    }
    // console.log(`${currentYear}-${monthNum}-${dateNumber}T00:00:00.000Z`);
    return nextFutureDate(new Date(`${currentYear}-${monthNum}-${dateNumber}T00:00:00.000Z`));
}

export function nextFutureDate(date: Date) {
    // clone to avoid mutating date
    date = new Date(date.getTime());
    let now = new Date();
    date.setFullYear(now.getFullYear())
    let diff = now.getTime() - date.getTime();
    if(diff > 0) {
        date.setFullYear(now.getFullYear() + 1);
    }
    return date;
}

export function parseDate(dateStr: string): Date {
    dateStr = dateStr.toLowerCase();
    // jan 01
    if (new RegExp(`^${shortMonth} ${twoNumbers}$`).test(dateStr)) {
        return shortMonthdateNumber(dateStr);
    }
    // jan 01 1970
    if (new RegExp(`^${shortMonth} ${twoNumbers} ${fourNumbers}$`).test(dateStr)) {
        return shortMonthdateNumberYear(dateStr);
    }
    // january 01
    if (new RegExp(`^${longMonth} ${twoNumbers}$`).test(dateStr)) {
        return longMonthdateNumber(dateStr);
    }
    throw new DateParseError('Did not match any known date format');
}

