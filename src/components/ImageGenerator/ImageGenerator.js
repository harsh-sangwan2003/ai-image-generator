import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import defaultImage from '../Assets/default_image.svg'

const ImageGenerator = () => {

    const [imageUrl, setImageUrl] = useState('/');
    const [loading, setLoading] = useState(false);

    let inputRef = useRef(null);

    const imageGenerator = async () => {

        if (inputRef.current.value === "") {

            return 0;
        }

        setLoading(true);

        const response = await fetch("https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer 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",
                    "User-Agnet": "Chrome",
                },
                body: JSON.stringify({

                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),

            });

        let data = await response.json();
        let dataArray = data.data;
        setImageUrl(dataArray[0].url);

        setLoading(false);

    }
    return (
        <div className='ai-image-generator'>
            <div className='header'>
                Ai Image <span>generator</span>
            </div>
            <div className='img-loading'>
                <div className='image'>
                    <img src={imageUrl === "/" ? defaultImage : imageUrl} alt="ai-image" />
                </div>
                <div className='loading'>
                    <div className={loading ? "loading-bar-full" : "loadig-bar"}>
                        <div className={loading ? "loading-text" : "display-none"}>
                            Loading...
                        </div>
                    </div>
                </div>
            </div>
            <div className='search-box'>
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to say...' />
                <div className='generate-btn' onClick={() => { imageGenerator() }}>
                    Generate
                </div>
            </div>
        </div>
    )
}

export default ImageGenerator
