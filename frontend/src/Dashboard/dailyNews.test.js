import {backendAPI} from "../SimpleForm/backendAPI";
import {act, render, screen} from "@testing-library/react";
import {DailyNews} from "./dailyNews";
jest.mock("../SimpleForm/backendAPI")
describe('news page', function () {

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
    }
    it('should display news', async function () {
        const location = {
            search: "?companyId=100&page=0"
        }

        backendAPI.getTopNews.mockResolvedValue( response)
        await act(async () => {
            await render(<DailyNews location={location}/>)
        })

        expect(backendAPI.getTopNews).toHaveBeenCalledTimes(1)
        expect(screen.getByText("Headline!")).toBeInTheDocument();
        expect(screen.getByText("blah blah blah")).toBeInTheDocument();
        expect(screen.getByTestId("next")).toBeInTheDocument()
        expect(screen.getByTestId("back")).toBeInTheDocument();
    });
});