import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {backendAPI} from "./backendAPI";
import {useLocation, useParams} from "react-router-dom";
import * as queryString from "querystring";
import {
    AdminContainer, BlueButton,
    BlueInput,
    Chip,
    ChipContainer,
    Header,
    NewsContainer,
    PlainText,
    UrlHolder
} from "./adminPage.styled";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const AdminPage = ({location}) => {
    const parsed = (location && location.search) ? queryString.parse(location.search.slice(1)) : undefined;
    const topic = (parsed && parsed.topic) ? parsed.topic : ''
    const [ack, setAck] = useState(false)
    const [items, setItems] = useState([])
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = async data => {
        setAck(true)
        await backendAPI.submitURL(data["example"])
    };

    useEffect(async () => {
        const resp = await backendAPI.getData(topic);
        if (resp && resp.length > 0) {
            setItems([...items, ...resp])
        }
    }, [])

    const getData = async () => {
        const resp = await backendAPI.getData(topic);
        setItems([...items, ...resp])
    }
    const display = () =>
        items.map(item => {
            return <NewsContainer key={item._id}>
                <Header>{item.title}</Header>
                <UrlHolder>{item.url}</UrlHolder>
                <br/>
                <div>
                    <PlainText>{item.data}</PlainText>
                    <br/>
                    <ChipContainer>
                        {item.topics.map(top => <Chip key={Math.random()}>{top}</Chip>)}
                    </ChipContainer>
                </div>
            </NewsContainer>;
        })
    return (
        <AdminContainer>
            <Header>Enter Site</Header>
            {ack && <PlainText>queued</PlainText>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input data-testid='textfield' defaultValue="" {...register("example")} />
                {errors.example && <span>This field is required</span>}
                <BlueInput data-testid='submit' type="submit"/>
                <BlueButton data-testid='getData' onClick={getData}>Results</BlueButton>
            </form>
            <hr/>
            {items && display()}
        </AdminContainer>
    );
}