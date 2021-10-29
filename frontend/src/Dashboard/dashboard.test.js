import {act} from "@testing-library/react";
import {backendAPI} from "./backendAPI";
import {BrowserRouter} from "react-router-dom";

const {render, screen} = require("@testing-library/react");
const {Dashboard} = require("./dashboard");

jest.mock("./backendAPI")


describe('Dashboard', () => {
    it('should have greetings', async function () {
        backendAPI.getData.mockResolvedValue(response)
        act(() => {
            render(<BrowserRouter><Dashboard/></BrowserRouter>,{})
        })
        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    const response = {
        "Test": {}
    }

});