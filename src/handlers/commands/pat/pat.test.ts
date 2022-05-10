import { fetchPetGif } from './pat';

beforeAll(() => {
    require('dotenv').config({
        path: `.${(<string>process.env.NODE_ENV).trim()}.env`,
    });
});

describe('pat gif fetcher', () => {
    it('should fetch a gif', async () => {
        const gifURl = await fetchPetGif();
        expect(gifURl).toBeDefined();
    });
});
