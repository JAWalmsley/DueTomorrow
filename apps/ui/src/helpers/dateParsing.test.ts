const dateParsing = require('./dateParsing.ts')

test('Parsing mmmdd', () => {
    expect(dateParsing.parseDate("jan 01")).toStrictEqual(new Date("2023-01-01"));
    expect(dateParsing.parseDate("dec 7")).toStrictEqual(new Date("2023-12-07"));
    expect(dateParsing.parseDate("mar 25")).toStrictEqual(new Date("2023-03-25"));
    expect(() => dateParsing.parseDate("feb 30")).toThrowError(dateParsing.DateParseError);
})