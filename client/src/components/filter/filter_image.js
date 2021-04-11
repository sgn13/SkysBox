import React, { useState, useRef, useEffect } from 'react'
import SliderImage from './silder'
import SidebarItem from './sidebar-item'
import ImageF from './imageF'
import UploadImage from './uploadImg'
import immm from '../../image/banner.jpg'
import './filter.css'
import { toJpeg, toPng } from 'html-to-image'
import ReactToPrint from 'react-to-print';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";

const IMAGE_TYPE = {
    JPEG: 'JPEG',
    PNG: 'PNG',
}

const getImageConverter = (imageType) => {
    switch (imageType) {
        case IMAGE_TYPE.JPEG: return toJpeg;
        case IMAGE_TYPE.PNG: return toPng;
        default: return null;
    }
}
const getImageName = (imageType) => {
    switch (imageType) {
        case IMAGE_TYPE.JPEG: return 'sample.jpeg';
        case IMAGE_TYPE.PNG: return 'sample.png';
        default: return null;
    }
}

const DEFAULT_OPTIONS = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },

    {
        name: 'Hue Rotate',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 360
        },
        unit: 'deg'
    },
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20
        },
        unit: 'px'
    },
]


const FilterImage = React.forwardRef((props, ref) => {
    const [options, setOptions] = useState(DEFAULT_OPTIONS)
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [url, setUrl] = useState('')
    const [img, setImg] = useState('')
    const [filter, setFilter] = useState('')


    const selected = options[selectedOptionIndex]


    const handleImageUpload = (e) => {
        console.log(e.target.files[0])
        setImg(e.target.files[0])

    }

    function handleSliderChange({ target }) {
        console.log({ target })
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionIndex) return option
                return { ...option, value: target.value }
            })
        })
    }


    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`

        })

        return { filter: filters.join(' ') }

    }
    var imo = document.getElementById('img-download');
    var btn = document.getElementById('foo');



    function storeURL(url) {
        setUrl(url)

    }
    console.log(props)
    console.log(getImageStyle())

    useEffect(() => {
        getImageStyle()

    }, [])

    return (
        <div className="container" >
            <div className="container-filter">


                <ImageF
                    {...props}
                    ref={ref}
                    img={img}
                    getImageStyle={getImageStyle()}
                    id="img-download"
                />


                <div className="sidebar-filter">
                    {
                        options.map((option, index) => {
                            return (
                                <SidebarItem
                                    key={index}
                                    name={option.name}
                                    active={index === selectedOptionIndex}
                                    handleClick={() => setSelectedOptionIndex(index)}
                                />
                            )
                        })
                    }

                </div>
                <SliderImage
                    min={selected.range.min}
                    max={selected.range.max}
                    value={selected.value}
                    handleChange={handleSliderChange}
                />
                <br></br>
                <UploadImage img={img} handleChange={handleImageUpload} />


            </div >
        </div >
    )
})

const createImage = (imageType) => {
    const targetNodeId = 'main-image';
    const targetNode = document.getElementById(targetNodeId);
    const imageConverter = getImageConverter(imageType);

    if (!targetNode) return alert(`Target Dom: ${targetNodeId} doesn't exist`);
    if (!imageConverter) return alert(`Invalid Image Type: ${imageType}`);

    imageConverter(targetNode)
        .then((dataUrl) => {
            const img = new Image();
            const link = document.createElement('a');
            img.src = dataUrl;
            link.download = getImageName(imageType);
            link.href = dataUrl;
            link.click();
        })
        .catch((error) => console.error('Image convert error!', error));
}

const MyComponent = (props) => {
    const componentRef = useRef();

    return (
        <React.Fragment>
            <FilterImage {...props} ref={componentRef} />
            <button onClick={() => createImage(IMAGE_TYPE.JPEG)} className="btn-download">
                Export As JPEG
        </button>


            <button onClick={() => createImage(IMAGE_TYPE.PNG)} className="btn-download">
                Export As PNG
        </button>
        </React.Fragment>);
}

export default MyComponent;
