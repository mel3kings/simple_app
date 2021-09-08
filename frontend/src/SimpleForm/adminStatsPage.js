import {useEffect, useState} from "react";
import {backendAPI} from "./backendAPI";
import {Chart} from "react-google-charts";
import queryString from "querystring";
import {GraphContainers, PlainText, StatsContainer, SubContainers} from "./adminStatsPage.styled";
import {Header} from "./adminPage.styled";

export const AdminStatsPage = ({location}) => {
    const [companyProfile, setCompanyProfile] = useState([[]])
    const [companyName, setCompanyName] = useState('')
    const [data, setData] = useState([])
    const parsed = (location && location.search) ? queryString.parse(location.search.slice(1)) : undefined;
    const id = (parsed && parsed.id) ? parsed.id : ''

    useEffect(() => {
        const getCompanyDetails = async () => {
            const res = await backendAPI.getAllCompanyProfile()
            return res
        }
        getCompanyDetails().then(r => {
            const transformed = formatData(r)
            setData(transformed)
            if (id !== '') {
                const company = r[id]
                setCompanyProfile(formatCompanyData(company))
                setCompanyName(company.companyName)
            }

        })
    }, [])
    return <StatsContainer>
        <Header>Company Stats</Header>
        <GraphContainers>
            <Chart
                width={'700px'}
                height={'600px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: 'Company Profiles',
                    chartArea: {width: '50%'},
                    isStacked: true,
                    hAxis: {
                        title: 'Company Profile',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Companies',
                    },
                }}
                // For tests
                rootProps={{'data-testid': '3'}}
            />
            {(companyProfile && companyProfile.length > 0) && <SubContainers><Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Element',
                        'Clicks',
                        {role: 'style'},
                        {
                            sourceColumn: 0,
                            role: 'annotation',
                            type: 'string',
                            calc: 'stringify',
                        },
                    ],
                    ...companyProfile
                ]}
                options={{
                    title: `Company ESG Profile: ${companyName}`,
                    width: 500,
                    height: 300,
                    bar: {groupWidth: '95%'},
                    legend: {position: 'none'},
                }}
                // For tests
                rootProps={{'data-testid': '6'}}
            />
                {companyName && <div><Header>{companyName}</Header>
                    <PlainText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices est eget iaculis
                        ultrices. Etiam vestibulum lacus odio, eget malesuada mi sodales sit amet. Vestibulum
                        consectetur
                        enim a velit feugiat sollicitudin. Cras erat eros, commodo a orci ac, interdum faucibus sapien.
                        Maecenas pharetra metus id imperdiet mollis. Cras congue lacus ligula, vel gravida lectus
                        dignissim
                        ut. Nam ac dolor elit. Phasellus sollicitudin velit et odio ullamcorper, ac vulputate nisi
                        luctus.
                        Vivamus lacinia et arcu in suscipit. Vivamus metus ipsum, suscipit a nunc id, fermentum
                        scelerisque
                        ligula. Nulla est nisl, convallis ut convallis eget, placerat sit amet nunc. Nam dolor ipsum,
                        faucibus id tincidunt sed, imperdiet quis ante. Duis maximus nunc a est euismod
                        porta.</PlainText>
                </div>}
            </SubContainers>}
        </GraphContainers>
    </StatsContainer>;
}


export const formatData = (response) => {
    const company = {}
    if (!response) {
        return [[]]
    }
    const topics = Object.entries(response).flatMap(
        ([companyId, companyProfile]) => {
            company[companyId] = [companyProfile.companyName]
            if (companyProfile.profile) {
                return Object.keys(companyProfile.profile)
            }
        }
    );

    const set = [...new Set(topics)]
    for (const topic of set) {
        for (const companyId of Object.keys(response)) {
            const companyProfile = response[companyId]
            const arr = company[companyId]
            arr.push(companyProfile.profile[topic])
        }
    }
    return [
        ['Company', ...set],
        ...Object.values(company)
    ]
}

export const formatCompanyData = (data) => {
    const profile = data.profile
    const res = []
    Object.entries(profile).flatMap((k, v) => {
        let temp = []
        temp = [...temp, ...k]
        temp.push('blue')
        temp.push(temp[1])
        res.push(temp)
    })

    return res;
}