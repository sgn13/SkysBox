import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import CanComponent from './canva_component';



function Example() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <CanComponent ref={componentRef} />
            <button onClick={handlePrint}>Print this out!</button>
        </div>
    );
};
export default Example