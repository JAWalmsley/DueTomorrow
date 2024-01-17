const dateParsing = require('./dateParsing.ts')

test('Parsing mmmdd', () => {
    expect(dateParsing.parseDate("jan 01")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-01-01")));
    expect(dateParsing.parseDate("dec 7")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-12-07")));
    expect(dateParsing.parseDate("mar 25")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-03-25")));
    expect(() => dateParsing.parseDate("feb 30")).toThrowError(dateParsing.DateParseError);
    expect(dateParsing.nextFutureDate(new Date("1999-01-01"))).toStrictEqual(new Date("2025-01-01"));
    expect(dateParsing.nextFutureDate(new Date("1999-01-29"))).toStrictEqual(new Date("2024-01-29"));
})