import { fetchRandomNumber, fetchRandomPhrase } from './rand';

describe('rand num and phrase fetcher', () => {
    it('should fetch a number', async () => {
        const num = await fetchRandomNumber(0, 10);
        expect(num).toBeDefined();
        expect(num).toBeGreaterThan(-1);
        expect(num).toBeLessThan(11);
    });

    it('should fetch text', async () => {
        const phrase = await fetchRandomPhrase();
        expect(phrase).toBeDefined();
    });
});
``;
