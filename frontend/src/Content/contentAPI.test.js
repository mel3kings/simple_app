import '@testing-library/jest-dom/extend-expect'
import {contentAPI} from './contentAPI'
import {dbClient} from './mongoClient'

describe('Content Pages API', () => {


    it('should get mocked response from mongo db', async () => {
        const data = {
            body:{
                data: "blah"
            }
        }
        jest.spyOn(dbClient, 'getData').mockResolvedValue(data)
        const api = new contentAPI();
        const id = 1;
        const response = await api.getDetails(id)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("blah")
    });

    xit('should gat data from mongo', async function () {
        const api = new contentAPI();
        const id = 1;
        const response = await api.getDetails(id)
        console.log("actual response" + JSON.stringify(response))
        expect(response.status).toBe(200)
        expect(response.body.data).toBeTruthy()
    });
});