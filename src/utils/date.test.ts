import { convertDate } from './date';

describe('date utils', () => {
  it('should convert date string to formatted date', () => {
    const dateString = '2024-03-14T12:00:00.000Z';
    const expected = 'March 14, 2024';

    expect(convertDate(dateString)).toBe(expected);
  });

  it('should handle different date formats', () => {
    const dates = ['2024-01-01', '2024/02/15', '2024.03.20'];

    const expected = ['January 1, 2024', 'February 15, 2024', 'March 20, 2024'];

    dates.forEach((date, index) => {
      expect(convertDate(date)).toBe(expected[index]);
    });
  });
});
