const {mapArray, truncateBody, aggregateDashboardNews, getCompanyProfile, updateCompanyProfile} = require("./dbClient");
const {CompanyProfiles} = require("./companyProfileDBClient");
describe('mongo db', function () {
    it('should map an array to correct document format', function () {
        const arr = ['http://google.com', 'http://facebook.com'];
        const response = mapArray(arr);
        expect(response).toEqual([
            {
                url: 'http://google.com'
            },
            {
                url: 'http://facebook.com'
            }
        ])
    });
});

describe('sanitise', function () {
    const sampleData = "blah blahblahblahblahblahblahbla h blah blah blah"
    it('should only show first n characters', function () {
        const sanitised = truncateBody(sampleData, 4);
        expect(sanitised).toEqual('blah')
    });

    it('should still work if length is less than actual data size', function () {
        const sanitised = truncateBody(sampleData, 1000);
        expect(sanitised).toEqual('blah blahblahblahblahblahblahbla h blah blah blah')
    });

    it('should not break if data is empty', function () {
        const sanitised = truncateBody('', 1000);
        expect(sanitised).toEqual('')
    });
});

describe('separate response', function () {
    const response = [
        {
            "_id": "1",
            "url": "http://pfacbuk.com",
            "data": "asdas",
            "topics": [
                "red",
                "blue",
                "green"
            ]
        },
        {
            "_id": "2",
            "url": "http://gogle.com",
            "data": "def",
            "topics": [
                "vaccine mandate",
                "diversity and inclusion",
                "cybersecurity"
            ]
        }]
    it('should run', function () {

        const actualResponse = aggregateDashboardNews(response)
        expect(actualResponse.riskMonitor.length).toEqual(6)
        expect(actualResponse.dailyNews.length).toEqual(2)
    });


    it('filter by company id', function () {
        const actualResponse = aggregateDashboardNews(response, 2)
        expect(actualResponse.riskMonitor.length).toEqual(3)
        expect(actualResponse.dailyNews.length).toEqual(2)
    });
    it('should show topics as risk monitor', function () {
        const actualResponse = aggregateDashboardNews(response)
        expect(actualResponse.riskMonitor.length).toEqual(6)
        const expected = [
            {
                "title": "red",
                "data": "hardcoded red"
            },
            {
                "title": "blue",
                "data": "hardcoded blue"
            },
            {
                "title": "green",
                "data": "hardcoded green"
            },
            {
                "data": "With mounting public pressure to open up, here is what you need to consider in this space.",
                "title": "vaccine mandate"
            },
            {
                "data": "Quality of including or involving people from a range of different social and ethnic backgrounds and of different genders, sexual orientations",
                "title": "diversity and inclusion"
            },
            {
                "data": "Practice of protecting systems, networks, and programs from digital attacks",
                "title": "cybersecurity"
            }]
        expect(actualResponse.riskMonitor).toEqual(expected)
    });

    it('should aggregate based on company id', function () {
        const actualResponse = aggregateDashboardNews(response, 1)
        expect(actualResponse.riskMonitor.length).toEqual(3)

    });

    it('should run aggregate news', function () {
        const response = [
            {
                "_id": "1",
                "url": "http://pfacbuk.com",
                "data": "asdas",
                "topics": [
                    "red",
                    "blue",
                    "green"
                ]
            },
            {
                "_id": "2",
                "url": "http://gogle.com",
                "data": "def",
                "topics": [
                    "vaccine mandate",
                    "diversity and inclusion",
                    "cybersecurity"
                ]
            },
            {
                "_id": "3",
                "url": "hasdasttp://gogle.com",
                "data": "def",
                "topics": [
                    "covid",
                    "diversity",
                    "hackernews"
                ],
                "monitor": true
            }]

        const actualResponse = aggregateDashboardNews(response)
        expect(actualResponse.riskMonitor.length).toEqual(9)
        expect(actualResponse.dailyNews.length).toEqual(2)
    });

    it('should get all Company profiles if no id is provided', function () {
        const response = getCompanyProfile()
        expect(response).toEqual(CompanyProfiles)
    });

    it('should filter by id if id is provided', function () {
        const response = getCompanyProfile(1)
        expect(response).toEqual(CompanyProfiles["1"])
        expect(response).not.toEqual(CompanyProfiles["2"])
    });

    it('should update company details based on the topics', function () {
        const response = getCompanyProfile(1);
        const covid = response.profile["covid"];
        expect(covid).toBeGreaterThan(0)
        updateCompanyProfile(1, ["covid"])
        expect(getCompanyProfile(1).profile["covid"]).toEqual(covid + 1)
        updateCompanyProfile(1, ["covid"])
        expect(getCompanyProfile(1).profile["covid"]).toEqual(covid + 2)
    });

    it('should save new key if it doesnt exist', function () {
        const response = getCompanyProfile(1);
        expect(response.profile["unknowntopic"]).toBeFalsy()
        updateCompanyProfile(1, ["unknowntopic"])
        expect(getCompanyProfile(1).profile["unknowntopic"]).toEqual(1)
    });

    it('should increment multiple profiles at a time', function () {
        const response = getCompanyProfile(1);
        expect(response.profile["asdsa"]).toBeFalsy()
        updateCompanyProfile(1, ["asdsa", "cybersecurity", "diversity"])
        expect(getCompanyProfile(1).profile["asdsa"]).toEqual(1)
        expect(getCompanyProfile(1).profile["cybersecurity"]).toBeGreaterThan(0)
        expect(getCompanyProfile(1).profile["diversity"]).toBeGreaterThan(2)
    });


});
