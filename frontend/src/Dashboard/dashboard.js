import {useEffect, useState} from "react";
import {backendAPI} from "./backendAPI";
import {
    ButtonContainer,
    ContentBody, BriefCard
} from "./dashboard.styled";
import queryString from "querystring";
import {Link} from "react-router-dom";

export const Dashboard = ({location}) => {
    const parsed = (location && location.search) ? queryString.parse(location.search.slice(1)) : undefined;
    const companyId = (parsed && parsed.companyId) ? parsed.companyId : ''
    useEffect(() => {
        backendAPI.getData(companyId).then(response => {
        })
    }, [companyId])

    const next = `/content?companyId=${companyId}&page=0`
    return <>
        <ContentBody>
            <BriefCard>
                <h2>Header</h2>
                <h3>Testing</h3>
                <ButtonContainer>
                    <Link to={location => `${next}`} style={{textDecoration: 'none'}}></Link>
                </ButtonContainer>
            </BriefCard>
        </ContentBody>
    </>
}