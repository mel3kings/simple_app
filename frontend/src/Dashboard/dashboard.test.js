import {act} from "@testing-library/react";

const {render, screen} = require("@testing-library/react");
const {Dashboard} = require("./dashboard");
import {backendAPI} from "../SimpleForm/backendAPI";
import {BrowserRouter} from "react-router-dom";

jest.mock("../SimpleForm/backendAPI")


describe('Dashboard', function () {
    it('should have greetings', async function () {
        backendAPI.getTopNews.mockResolvedValue(response)
        await act(async () => {
            await render(<BrowserRouter><Dashboard/></BrowserRouter>)
        })

        expect(screen.getByText('Risk Monitor')).toBeInTheDocument();
        expect(screen.getByText('Daily Brief')).toBeInTheDocument();
        expect(screen.getByText('Your top risks and opportunities to focus on')).toBeInTheDocument();
    });


    const response = {
        "dailyNews": [{
            title: "Headline!",
            data: "blah blah blah",
            topics: ["blah"]
        }, {
            title: "asdasdsa News",
            data: "Testing testing",
            topics: ["blah"]
        }],
        "riskMonitor": [{
            title: "Vaccine Mandate",
            data: "Ipsum Lorem",
            topics: ["clicked", "covid"]
        }, {
            title: "Second News",
            data: "Testing testing",
            topics: ["blah"]
        }]
    }

    it('should display content based on backend api', async function () {
        backendAPI.getTopNews.mockResolvedValue(response)
        await act(async () => {
            await render(<BrowserRouter><Dashboard/></BrowserRouter>)
        })

        expect(backendAPI.getTopNews).toHaveBeenCalledTimes(1)
        expect(screen.getByText(/Vaccine Mandate/i)).toBeInTheDocument()
        expect(screen.getByText("Ipsum Lorem")).toBeInTheDocument();
        expect(screen.getByText(/Second News/i)).toBeInTheDocument();
    });

    it('should truncate companyId', async function () {
        const local = {
            search: "?companyId=100"
        }
        backendAPI.getTopNews.mockResolvedValue(response)
        await act(async () => {
            await render(<BrowserRouter><Dashboard location={local}/></BrowserRouter>)
        })

        expect(backendAPI.getTopNews).toHaveBeenCalledTimes(1)
        expect(backendAPI.getTopNews).toHaveBeenCalledWith("100");
        expect(screen.getByText(/Vaccine Mandate/i)).toBeInTheDocument()
        expect(screen.getByText("Ipsum Lorem")).toBeInTheDocument();
        expect(screen.getByText(/Second News/i)).toBeInTheDocument();
    });

    it('should count daily news', async function () {
        backendAPI.getTopNews.mockResolvedValue(response)
        await act(async () => {
            await render(<BrowserRouter><Dashboard/></BrowserRouter>)
        })

        expect(screen.getByText(/Get up to speed on the 2 latest news articles for your top risk area/i)).toBeInTheDocument()
        expect(screen.getByText(/2 unread/i)).toBeInTheDocument()
    });

    it('should count the number of clicks on review', async function () {
        backendAPI.getTopNews.mockResolvedValue(response)
        const local = {
            search: "?companyId=100"
        }
        await act(async () => {
            await render(<BrowserRouter><Dashboard location={local}/></BrowserRouter>)
        })
        screen.getByTestId("VACCINE MANDATE").click()
        const request = {
            companyId: "100",
            topics: ["clicked", "covid"]
        }
        expect(backendAPI.trackCompanyActivity).toHaveBeenCalledWith(request)

    });

});