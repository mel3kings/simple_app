import {useEffect, useState} from "react";
import {backendAPI} from "../SimpleForm/backendAPI";
import {
    Author, BestPractice, ButtonContainer,
    Card,
    CardContentHolder,
    CardHeader,
    CardSubHeader, CompanyOne, CompanyTwo,
    ContentBody, DailyNewsBriefCard, GetUpToDateImage, H3, HeaderImage, ImageHolder, LineBreak,
    NumberHolder,
    SubHeading, TextHolder
} from "./dashboard.styled";
import queryString from "querystring";
import {Link} from "react-router-dom";

export const Dashboard = ({location}) => {
    const [riskMonitor, setRiskMonitor] = useState([])
    const [dailyNews, setDailyNews] = useState([])
    const parsed = (location && location.search) ? queryString.parse(location.search.slice(1)) : undefined;
    const companyId = (parsed && parsed.companyId) ? parsed.companyId : ''
    useEffect(() => {
        backendAPI.getTopNews(companyId).then(response => {
            setDailyNews([...response.dailyNews])
            setRiskMonitor([...response.riskMonitor])
        })
    }, [companyId])

    const trackCompanyActivity = (topics) => {
        const request = {
            companyId: companyId,
            topics: topics
        }
        backendAPI.trackCompanyActivity(request)
    }
    const next = `/content?companyId=${companyId}&page=0`
    return <>
        {companyId && companyId === "2" ? <CompanyTwo/> : <CompanyOne/>}
        <HeaderImage/>
        <ContentBody>
            <DailyNewsBriefCard>
                <h2>Daily Brief</h2>
                <h3>Get up to speed on the {dailyNews.length} latest news articles for your top risk areas. </h3>
                {/*<h2>{dailyNews.length > 0 && dailyNews[0].title}</h2>*/}
                <ButtonContainer>
                    <h5>{dailyNews.length} unread</h5>
                    <Link to={location => `${next}`} style={{textDecoration: 'none'}}><GetUpToDateImage/></Link>
                </ButtonContainer>
            </DailyNewsBriefCard>
            <LineBreak/>
            <H3>Risk Monitor</H3>
            <SubHeading>Your top risks and opportunities to focus on</SubHeading>
            {riskMonitor && riskMonitor.map((riskMonitorItem, index) => {
                    const title = riskMonitorItem.title.toUpperCase();
                    return <Card key={title}>
                        <CardContentHolder data-testid={title}
                                           onClick={() => trackCompanyActivity(riskMonitorItem.topics)}>
                            <ImageHolder><NumberHolder/><TextHolder>{index + 1}</TextHolder></ImageHolder>
                            <div>
                                <CardHeader>{title}</CardHeader>
                                <CardSubHeader>{riskMonitorItem.data}</CardSubHeader>
                            </div>
                        </CardContentHolder>
                    </Card>
                }
            )}
            <BestPractice/>
        </ContentBody>
    </>
}