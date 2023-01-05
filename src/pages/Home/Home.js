import React from "react";
import Header from "../../components/Header/Header";
import './Home.css';
import { useState } from "react";
import Axios from "axios";

function Home() {
    const [urlFull, setUrlFull] = useState([]);
    const [dataUrl, setDataUrl] = useState([]);
    const [textShortUrl, setTextShortUrl] = useState([]);
    const doShortUrl = () => {
        console.log(urlFull);
        Axios.post("https://projectshorturlws.onrender.com/shortUrl",{
//         Axios.post("http://localhost:3001/shortUrl", {
            urlFull: urlFull
        }).then((response) => {
            console.log(response);
            setDataUrl(response.data);
            setTextShortUrl(getTextUrl(dataUrl.shortUrl));
        })
    }

    const getTextUrl = (shortUrl) => {
        const textUrl = new URL(shortUrl).hostname + '/' + dataUrl.shortId;
        console.log(textUrl);
        console.log(shortUrl);
        console.log(dataUrl.shortId);
        return textUrl;
    }

    return (<div>
        <div className="container">
            <Header />
            <div className="col d-flex justify-content-center">
                <div className="card cardUrl">
                    <div className="card-body">
                        <h3>Paste the URL to be shortened</h3>
                        <div className="input-group input-group-sm mb-3">
                            <input type={"text"} onChange={(event) => setUrlFull(event.target.value)} className="form-control" />
                            <button type={"button"} className="btn btn-primary" onClick={() => doShortUrl()}>Short URL</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col d-flex justify-content-center">
                <div className="card cardResult">
                    <div className="card-body">
                        <div className="resultText">
                            <div className="origin-link">
                                {dataUrl.fullUrl}
                            </div>
                            <div className="short-link">
                                <a href={dataUrl.shortUrl} title={dataUrl.shortUrl} target="_blank">{textShortUrl}</a>
                            </div>
                            <div className="count-link">
                            <h6>click {dataUrl.clicks}</h6>
                            </div>
                            <div className="copy-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>);
}
export default Home;
