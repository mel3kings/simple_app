import {useEffect, useState} from "react";
import {backendAPI} from "../SimpleForm/backendAPI";
import queryString from "querystring";
import {BackButtonHolder, ButtonContainer, DailyNewsContent, NextButtonHolder} from "./dailyNews.styled";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Chip, ChipContainer} from "../SimpleForm/adminPage.styled";

export const DailyNews = ({location}) => {
    const [news, setNews] = useState({})
    const [maxLength, setMaxLength] = useState(0);
    const [page, setPage] = useState(0);
    const [topics, setTopics] = useState([]);
    const parsed = (location && location.search) ? queryString.parse(location.search.slice(1)) : undefined;
    const companyId = (parsed && parsed.companyId) ? parsed.companyId : '1'
    useEffect(() => {
        backendAPI.getTopNews(companyId).then(response => {
            console.log(`response ${response}`)
            const currentNews = response.dailyNews[page];
            setTopics(currentNews.topics.slice(0, 2));
            setMaxLength(response.dailyNews.length);
            setNews(currentNews);
        })
    }, [page, companyId])

    const trackCompanyActivity = (topics) => {
        const request = {
            companyId: companyId,
            topics: topics
        }
        backendAPI.trackCompanyActivity(request)
    }
    const changePage = (page) => {
        setPage(page)
    }
    return <DailyNewsContent>
        <div>{news && <ProgressBar now={page} max={maxLength}/>}</div>
        <h4>{page} of {maxLength}</h4>
        <div>
            {news && <h3>{news.title}</h3>}
            {(news && news.data) && <p>{news.data}</p>}
            <ChipContainer>
                {topics.map(top => <Chip key={Math.random()}>{top}</Chip>)}
            </ChipContainer>
        </div>
        <ButtonContainer>
            <BackButtonHolder onClick={() => changePage(page - 1)} data-testid={"back"}/>
            <NextButtonHolder onClick={() => {
                changePage(page + 1)
                trackCompanyActivity(topics)
            }} data-testid={"next"}/>
        </ButtonContainer>
    </DailyNewsContent>
}