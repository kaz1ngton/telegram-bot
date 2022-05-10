import { isSpecWordText } from './spec-word';

describe('spec-word', () => {
    test('text has spec-word', () => {
        expect(isSpecWordText('Дай')).toBe(false);
        expect(isSpecWordText('Да!')).toBe(false);
    });
});
