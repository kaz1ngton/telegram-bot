import { fetchSummonGif } from './summon';

beforeAll(() => {
    require('dotenv').config({
        path: `.${(<string>process.env.NODE_ENV).trim()}.env`,
    });
});

describe('summon gif fetcher', () => {
    it('should fetch a gif', async () => {
        const gif = await fetchSummonGif();
        expect(gif).toBeDefined();
    });
});
