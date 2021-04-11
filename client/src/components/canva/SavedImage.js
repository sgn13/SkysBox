import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ImageContainer = ({ newImage }) => {
    const [images, setImages] = useState([]);
    const [fallback, setFallback] = useState('');
    const getImages = async () => {
        try {
            const res = await axios.get('api/img');
            if (!res.data.files) {
                setFallback(res.data.msg);
                return;
            } else {
                setImages(res.data.files);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getImages();
    }, [newImage]);

    const configureImage = image => {
        return 'http://localhost:5000/' + image;
    }
    console.log(images);
    return (
        <div className="savedImage container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {images.length > 0 ?
                (
                    images.map(image => (
                        <img src={configureImage(image)} key={image} alt={image} width="30%" className="image" style={{ margin: '10px 0' }} />
                    ))
                )
                :
                <>
                    <h1>
                        {fallback}
                    </h1>
                    <hr />
                    <h3>Upload Image</h3>
                </>
            }
        </div>
    )
}
export default ImageContainer;