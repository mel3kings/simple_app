export const backendAPI = {
    async getData(company = "") {
        try {
            const headers = {
                crossDomain: true,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
            const companyQuery = company === "" ? "" : `?companyId=${company}`
            const localURI = `${process.env.REACT_APP_BACKEND_API}`
            const res = await fetch(localURI, headers).then(response => response.json())
            return res.body
        } catch (e) {
            console.error(e)
            return {}
        }
    },
    submitData(request){
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
            const localURI = `http://localhost:3001/data/company/activity`
            fetch(localURI, headers).then(r => console.log(`tracked company activity ${request.companyId} with ${request.topics}`))
        } catch (e) {
            console.error(e)
            return;
        }
    },
}