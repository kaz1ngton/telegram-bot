import { isCapsText, toLowerCase } from './caps';

describe('caps', () => {
    test('text is caps', () => {
        expect(isCapsText('HELLO WORLD!')).toBe(false);
        expect(isCapsText('Hello my dear World!')).toBe(false);
        expect(isCapsText('HELLO MY DEAR WORLD!')).toBe(true);
    });

    test('text compiles to lowercase', () => {
        expect(toLowerCase('HELLO WORLD!')).toBe('Hello world!');
        expect(toLowerCase('Hi. Griffith')).toBe('Hi. Griffith');
    });
});
