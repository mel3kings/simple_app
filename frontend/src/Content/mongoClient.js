export class dbClient {

    static async getData(id) {
        const headers = {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        const localURI = "http://localhost:3001/mongo/" + id
        const res = await fetch(localURI, headers).then(response => response.json())
        return res
    }

}