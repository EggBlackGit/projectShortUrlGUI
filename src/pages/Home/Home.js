import React from "react";
import Header from "../../components/Header/Header";
import './Home.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function Home() {
    const [urlFull, setUrlFull] = useState("");
    const [dataUrl, setDataUrl] = useState("");

    useEffect(() => {
        Axios.get("https://projectshorturlws.onrender.com/echo").then((response) => { // ปลุก ws ให้พร้อมใช้งาน
        // Axios.get("http://localhost:3001/echo").then((response) => { // ปลุก ws ให้พร้อมใช้งาน
        })
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const doShortUrl = () => {
        if (urlFull == null || urlFull == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Please enter url'
            })
            return false;
        }

        let checkUrlFormat = isValidHttpUrl(urlFull);
        if (checkUrlFormat) {
            Axios.post("https://projectshorturlws.onrender.com/shortUrl", {
            // Axios.post("http://localhost:3001/shortUrl", {
                urlFull: urlFull
            }).then((response) => {
                setDataUrl(response.data);
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid format url!'
            })
        }

    }

    const checkShortUrl = () => {
        let shortId = dataUrl.shortId;
        Axios.get("https://projectshorturlws.onrender.com/updateCount/"+shortId).then((response) => {
        // Axios.get("http://localhost:3001/updateCount/" + shortId).then((response) => {
            setDataUrl(response.data);
            window.open(response.data.fullUrl, '_blank');
        })
    }

    const copyToClipboard = (value) => {
        if (value != null) {
            navigator.clipboard.writeText(value);
            Toast.fire({
                icon: "success",
                title: "copy successfully",
            });
        } else {
            Toast.fire({
                icon: "warning",
                title: "copy fail short url empty",
            });
        }

    }

    const isValidHttpUrl = (textUrl) => {
        let url;
        try {
            url = new URL(textUrl);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    return (<div>
        <Header />
        <div className="container">
            
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

            {dataUrl !== "" ? <div className="col d-flex justify-content-center">
                <div className="card cardResult">
                    <div className="card-body">
                        <div className="resultText">
                            <div className="origin-link">
                                {dataUrl.fullUrl}
                            </div>
                            <div className="short-link">
                                <a href="#" onClick={() => checkShortUrl()}>{dataUrl.shortUrl}</a>
                            </div>
                            <div className="count-link">
                                <h6>click {dataUrl.clicks}</h6>
                            </div>
                            <div className="copy-link">
                                <h6>copy</h6>
                                <br/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16" onClick={() => copyToClipboard(dataUrl.shortUrl)}>
                                   <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                   <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div> : ('')}

        </div>
    </div>);
}
export default Home;
