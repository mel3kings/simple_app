import {act, fireEvent, render, screen} from '@testing-library/react'
import "@testing-library/jest-dom";
import {AdminPage} from "./adminPage";
import userEvent from '@testing-library/user-event'
import {backendAPI} from "./backendAPI";
import * as queryString from "querystring";

jest.mock('./backendAPI')


describe('simpleForm', function () {

    it('should have text field and submit button', function () {
        render(<AdminPage/>)
        const field = screen.getByText('Enter Site')
        expect(field).toBeTruthy()
        expect(screen.queryByTestId('textfield')).toBeTruthy()
        expect(screen.queryByTestId('submit')).toBeTruthy()
    });

    it('should submit to content api', async function () {
        render(<AdminPage/>);
        let url = 'http://google.com';

        await act(async () => {
            userEvent.type(screen.getByRole('textbox'), url)
            userEvent.click(screen.getAllByRole('button')[0])
        })
        expect(screen.getByText('queued')).toBeInTheDocument();
        expect(backendAPI.submitURL).toHaveBeenCalledTimes(1)
        expect(backendAPI.submitURL).toHaveBeenLastCalledWith(url)
    });

    xit('should call second api on refresh', async () => {
        render(<AdminPage/>);
        let url = 'http://google.com';

        await act(async () => {
            await userEvent.type(screen.getByRole('textbox'), url)
            await userEvent.click(screen.getAllByRole('button')[0])
            await userEvent.click(screen.queryByTestId('getData'))
        })

        expect(backendAPI.getData).toHaveBeenCalledTimes(1)
    })

    const actualResponse = [{
        "_id": "61176acf3f8dd1b1e2ca563d",
        "url": "https://corpgov.law.harvard.edu/",
        "data": "this is the raw body",
        "topics": ["Harvard Law School Forum", "Corporate Governance                                                         Home", "ArchiveCategoriesContributorsHiringBlogroll                                                                                  2021 Proxy Season Trends", "Executive Compensation", "Pamela Marcogliese", "Lori Goodman", "Elizabeth Bieber", "Freshfields Bruckhaus Deringer LLP", "Friday, August 13, 2021", "Boards"]

    }, {
        "_id": "61176acf3f8dd1b1e2ca563e",
        "url": "https://corpgov.law.harvard.edu/about/", "data": "asdfasfasdy",
        "topics": ["Harvard Law School Forum", "Corporate Governance                                                         Home", "ArchiveCategoriesContributorsHiringBlogroll", "the HLS Forum", "Corporate Governance", "The Harvard Law School Forum", "Corporate Governance", "the Harvard Law School Program", "Corporate Governance", "the Program"]
    }, {
        "_id": "61176acf3f8dd1b1e2ca563f",
        "url": "https://corpgov.law.harvard.edu/archive/", "data": "asdasd",
        "topics": ["Harvard Law School Forum", "Corporate Governance                                                         Home", "ArchiveCategoriesContributorsHiringBlogroll                                                                 Archived Posts", "9,365", "2021", "August", "35", "July", "78", "June"]
    }, {
        "_id": "61176acf3f8dd1b1e2ca5640",
        "url": "https://corpgov.law.harvard.edu/categories/", "data": "Asdasd",
        "topics": ["Harvard Law School Forum", "Corporate Governance                                                         Home", "ArchiveCategoriesContributorsHiringBlogroll                                                             Categories Academic Research", "2,729", "Accounting & Disclosure", "2,323", "Banking & Financial Institutions", "801", "Bankruptcy & Financial Distress", "208"]
    }, {
        "_id": "61176acf3f8dd1b1e2ca5641",
        "url": "BLAH", "data": "this asdasdasdas the raw body",
        "topics": ["Harvard Law School Forum", "Corporate Governance                                                         Home", "ArchiveCategoriesContributorsHiringBlogroll                                                     Contributors", "the editors", "the posts", "the Form", "the Forum", "unsolicited submissions", "Submissions", "any other correspondence"]
    }]

    it('should set state correctly', async function () {
        backendAPI.getData.mockImplementation(() => actualResponse)
        render(<AdminPage/>);

        await act(async () => {
            await userEvent.click(screen.queryByTestId('getData'))
        })
        expect(screen.queryByText("https://corpgov.law.harvard.edu/categories/")).toBeInTheDocument()
        expect(screen.queryByText("https://corpgov.law.harvard.edu/about/")).toBeInTheDocument()
        expect(screen.queryByText("BLAH")).toBeInTheDocument()
        expect(screen.getByText('this is the raw body')).toBeInTheDocument();
        // screen.debug()
    });

    it('should query param string', function () {
        const param =`?test=blah&topics=asdasd`
        const response = queryString.parse(param.slice(1))
        expect(response.test).toEqual('blah')
    });

});