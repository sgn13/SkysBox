import React from 'react'

function SliderImage({ min, max, value, handleChange }) {
    return (
        <div className="slider-container">
            <input
                type="range"
                className="slider"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
            />

        </div>
    )
}

export default SliderImage
