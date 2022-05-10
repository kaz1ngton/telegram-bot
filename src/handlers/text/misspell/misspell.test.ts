import { isMisspellText } from './misspell';

describe('misspell', () => {
    test('text is misspelled', () => {
        expect(isMisspellText('ихний')).toBe(true);
        expect(isMisspellText('Ихнее')).toBe(true);
        expect(isMisspellText('Их')).toBe(false);
    });
});
