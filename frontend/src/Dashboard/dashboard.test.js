import {act} from "@testing-library/react";

const {render, screen} = require("@testing-library/react");
const {Dashboard} = require("./dashboard");
import {backendAPI} from "./backendAPI";
import {BrowserRouter} from "react-router-dom";

jest.mock("./backendAPI")


describe('Dashboard', function () {
    it('should have greetings', async function () {
        backendAPI.getData.mockResolvedValue(response)
        await act(async () => {
            await render(<BrowserRouter><Dashboard/></BrowserRouter>)
        })
        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    const response = {
        "Test":{}
    }

});