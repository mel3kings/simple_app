import {useEffect, useState} from "react";
import {contentAPI} from "./contentAPI";
import {useParams} from "react-router-dom";

export const Content = () => {
    const {id} = useParams();
    const [response, setResponse] = useState({})

    useEffect(() => {
        const api = new contentAPI();
        api.getDetails(id).then(r => setResponse(r))
    }, [id])


    return <div>
        {response &&
        <div>
            <div style={header}>Article</div>
            <div style={divStyle} dangerouslySetInnerHTML={{__html: decodeURI(response.body.data)}}/>
            <br/>
            <div><b>Other fields:</b></div>
            <div>{decodeURI(JSON.stringify(response.body.others))}</div>
        </div>
        }
    </div>

}

const header = {
    fontFamily: 'Roboto Slab',
    fontSize: '44px',
    lineHeight: '56px',
    bottomMargin: '20px',
    color: '#012774'
}
const divStyle = {
    border: '5px solid black',
    fontFamily: 'Roboto Slab',
    fontWeight: '300',
    fontSize: '28px',
    lineHeight: '36px',
    bottomMargin: '20px'

};