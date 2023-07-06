import React, { useState ,useEffect } from 'react'
import validator from 'validator'
import generateShortURL from '../Service/ShortURL'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';


var stompClient = null;
export default function GenerateURL() {
    const [url, seturl] = useState();
    const [isValidURL, setIsValidURL] = useState(false);
    const [generatedURL, setGeneratedURL] = useState("");
    const validURL = "Invalid URL";


    const handleGenerateShoryURL = async () => {
        if (url) {
            if (validator.isURL(url)) {
                let inputObj = { "originalURL": url };
                let shortURLResponse = await generateShortURL(inputObj);
                setGeneratedURL(shortURLResponse.generatedShortURL);
                setIsValidURL(false);
            } else {
                setIsValidURL(true);
            }
        } else {
            setIsValidURL(true);
        }
    }

  useEffect(() => {
    connectWebSocket();
  }, []);
  const connectWebSocket = () => {
    let sockjs = new SockJS("http://localhost:1064/ws");
    stompClient = Stomp.over(sockjs);
    stompClient.connect({}, onConnect, onError)
  }
  const onConnect = () => {
    stompClient.subscribe('/topic/pubic', onPublicMessageReceived)
  }
  const onPublicMessageReceived = (payload) => {
    let data = JSON.parse(payload.body);
    switch (data.statusCode) {
      case 400:
        alert("The URL has expired ");
        break;
      case 404:
        alert("The URL doesn't Exist");
        break;
      default:
        break;
    }
  }

  const onError = (err) => {
    console.log(err);
  }

  // const sendPublicMessage = () => {
  //   if (stompClient) {
  //     let body = { "message": "The URL has Expired" }
  //     stompClient.send('/topic/sendMessage', {}, JSON.stringify(body));
  //   }
  // }
    return (
        <div>
            <h3 style={{ color: 'blue', display: 'flex', justifyContent: 'center' }}>
                GENERATE A LINK SHORTNER
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <input
                        type='text'
                        placeholder="Enter URL"
                        value={url}
                        onChange={(event) =>
                            seturl(event.target.value)
                        }
                    />
                </div>
                &nbsp;
                <button
                    onClick={handleGenerateShoryURL}
                >Generate URL</button>
            </div>
            {isValidURL ? <p style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', color: 'red' }}>{validURL}</p> : null};
            {generatedURL.length > 0 ? <span style={{ display: 'flex', fontWeight: 'bold', justifyContent: 'center' }}>Generated  :  &nbsp;<a href={generatedURL} target="_blank" rel="noreferrer">{generatedURL}</a> </span> : null}
        </div>
    )
}
