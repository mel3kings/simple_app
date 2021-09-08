import {dbClient} from "./mongoClient";

export class contentAPI {
    async getDetails(id) {
        const response = await dbClient.getData(id)
        if (response.body) {
            const html = response.body.data;
            delete (response.body.data)
            return {
                status: 200,
                body: {
                    data: html,
                    others: response,
                }
            };
        } else {
            return {
                status: 200,
                body: {
                    data: "",
                    others: "",
                }
            };
        }

    }
}