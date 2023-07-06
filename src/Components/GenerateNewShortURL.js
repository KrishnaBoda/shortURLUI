import React, { useState  } from 'react'
import generateShortURL from '../Service/ShortURL'
import validator from 'validator'

export default function GenerateNewShortURL() {

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
