
import { NATURE_CODES } from '../constants.tsx';

export const generateProjectCode = (
  year: number,
  studioCode: string,
  natures: string[],
  serial: number
): string => {
  // Part 1: Year (YY)
  const yy = year.toString().slice(-2);

  // Part 2: Studio (-, L-, C-)
  // Part 3: Sorted nature codes
  const sortedNatures = [...natures].sort((a, b) => {
    const orderA = NATURE_CODES.find(n => n.code === a)?.order || 99;
    const orderB = NATURE_CODES.find(n => n.code === b)?.order || 99;
    return orderA - orderB;
  });
  const natureStr = sortedNatures.join('');

  // Part 4: Serial (01, 02...)
  const serialStr = serial.toString().padStart(2, '0');

  return `${yy}${studioCode}${natureStr}${serialStr}`;
};
