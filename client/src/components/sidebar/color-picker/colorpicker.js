import React, { useState } from 'react';

import { SketchPicker } from 'react-color';
function ColorPicker(props) {
    const [color, setcolor] = useState()
    const [showPicker, setShowPicker] = useState(false)


    // console.log(showPicker)
    const handleChangeComplete = (color) => {
        setcolor({ color: color.hex });
        props.getTextColor(color);

    };

    return (
        <div >
            <button onClick={() => setShowPicker(showPicker => !showPicker)} className="toggleColor">{showPicker ? "Close color picker" : "Pick color"}</button>
            {showPicker ? <div >
                <SketchPicker
                    color={color}
                    onChangeComplete={handleChangeComplete}
                />
            </div>

                : null
            }

            <div style={{ color: color }} >
                {/* <h1>Hello   </h1> */}
            </div>

        </div >
    );

}
export default ColorPicker;
