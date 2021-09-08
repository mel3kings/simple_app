import {act, render, screen} from "@testing-library/react";
import {AdminStatsPage, formatCompanyData, formatData} from "./adminStatsPage";

jest.mock("./backendAPI")
describe('stats page', function () {
    it('should have title page', async function () {
        await act(async () => {
            render(<AdminStatsPage/>)
        })

        const field = screen.getByText('Company Stats')
        expect(field).toBeTruthy()
    });

    it('should format the data correctly for a stacked bar', function () {
        const formatted = formatData(backendResponse)
        expect(formatted).toEqual([
            ['Company', 'covid', 'cybersecurity', 'diversity'],
            ['AON', 0, 1, 1],
            ['Mckinsey', 0, 2, 3],
        ])
    });

    it('should create individual', function () {
        const formatted = formatCompanyData(individual,)
        expect(formatted).toEqual([
            ['covid', 0, 'blue', 0],
            ['cybersecurity', 1, 'blue', 1],
            ['diversity', 1, 'blue', 1]
        ])
    });

    it('should amend to nested data', function () {
        const formatted = [['covid', 0, 'blue', null],
            ['cybersecurity', 1, 'blue', null],
            ['diversity', 1, 'blue', null]]
        const expected = [
            [
                'Element',
                'Density',
                {role: 'style'},
                {
                    sourceColumn: 0,
                    role: 'annotation',
                    type: 'string',
                    calc: 'stringify',
                },
            ],
            ['covid', 0, 'blue', null],
            ['cybersecurity', 1, 'blue', null],
            ['diversity', 1, 'blue', null]
        ]

        const test = [[
            'Element',
            'Density',
            {role: 'style'},
            {
                sourceColumn: 0,
                role: 'annotation',
                type: 'string',
                calc: 'stringify',
            },
        ],
            ...formatted
        ]
        expect(expected).toEqual(test)
    });

    const individual = {
        "companyName": "AON",
        "topics": [
            "covid",
            "cybersecurity"
        ],
        "profile": {
            "covid": 0,
            "cybersecurity": 1,
            "diversity": 1
        }
    }

    const backendResponse = {
        "1": {
            "companyName": "AON",
            "topics": [
                "covid",
                "cybersecurity"
            ],
            "profile": {
                "covid": 0,
                "cybersecurity": 1,
                "diversity": 1
            }
        },
        "2": {
            "companyName": "Mckinsey",
            "topics": [
                "test"
            ],
            "profile": {
                "covid": 0,
                "cybersecurity": 2,
                "diversity": 3
            }
        }
    }
});