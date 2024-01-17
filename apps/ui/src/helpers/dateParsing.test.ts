const dateParsing = require('./dateParsing.ts')


test("Next future date", () => {
    expect(dateParsing.nextFutureDate(new Date("1999-01-01"))).toStrictEqual(new Date("2025-01-01"));
    expect(dateParsing.nextFutureDate(new Date("1999-01-29"))).toStrictEqual(new Date("2024-01-29"));
});

test('Parsing mmm dd', () => {
    expect(dateParsing.parseDate("jan 01")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-01-01")));
    expect(dateParsing.parseDate("dec 7")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-12-07")));
    expect(dateParsing.parseDate("mar 25")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-03-25")));
    // expect(() => dateParsing.parseDate("feb 30")).toThrowError(dateParsing.DateParseError);
});

test("Parsing mmm dd yyyy", () => {
    expect(dateParsing.parseDate("jan 01 2096")).toStrictEqual(new Date("2096-01-01"));
    expect(dateParsing.parseDate("sep 25 1992")).toStrictEqual(new Date("1992-09-25"));
    // expect(() => dateParsing.parseDate("feb 30 1999")).toThrowError(dateParsing.DateParseError);
    // expect(() => dateParsing.parseDate("not a real date")).toThrowError(dateParsing.DateParseError);
});

test("Parsing mmmmmmmm dd", () => {
    expect(dateParsing.parseDate("january 1")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-01-01")));
    expect(dateParsing.parseDate("december 7")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-12-07")));
    expect(dateParsing.parseDate("march 25")).toStrictEqual(dateParsing.nextFutureDate(new Date("2023-03-25")));
})

