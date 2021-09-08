export const backendAPI = {
    async submitURL(url) {
        const headers = {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        const localURI = `http://localhost:3001/crawl?page=${url}`
        const res = await fetch(localURI, headers).then(response => response.json())
        return res
    },
    async getData(topic = "") {
        try {
            const headers = {
                crossDomain: true,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
            const topicQuery = topic === "" ? "" : `?topic=${topic}`
            const localURI = `http://localhost:3001/mongo/article${topicQuery}`
            const res = await fetch(localURI, headers).then(response => response.json())
            return res.body
        } catch (e) {
            console.error(e)
            return {}
        }
    },
    async getTopNews(company = "") {
        try {
            const headers = {
                crossDomain: true,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
            const companyQuery = company === "" ? "" : `?companyId=${company}`
            const localURI = `http://aon-platform:3001/mongo/dashboard${companyQuery}`
            const res = await fetch(localURI, headers).then(response => response.json())
            return res.body
        } catch (e) {
            console.error(e)
            return {}
        }
    },
    trackCompanyActivity(request){
        if(!request.companyId || !request.topics || request.topics.length === 0){
            return;
        }
        const req =JSON.stringify(request)
        console.log(`sending request ${req}`)
        try {
            const headers = {
                crossDomain: true,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: req
            }
            const localURI = `http://aon-platform:3001/mongo/company/activity`
            fetch(localURI, headers).then(r => console.log(`tracked company activity ${request.companyId} with ${request.topics}`))
        } catch (e) {
            console.error(e)
            return;
        }
    },
    async getAllCompanyProfile() {
        try {
            const headers = {
                crossDomain: true,
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }
            const localURI = `http://aon-platform:3001/mongo/company/activity`
            const res = await fetch(localURI, headers).then(response => response.json())
            return res.body
        } catch (e) {
            console.error(e)
            return;
        }
    }


}