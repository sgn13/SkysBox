import React, { useState, useEffect, useRef } from 'react';
import { exportComponentAsJPEG, exportComponentAsPNG } from "react-component-export-image";
import { Ruler } from "../ruler";
import Draggable from "react-draggable";
import bgImage from '../../image/b1.png'
const CanvaNew = React.forwardRef((props, ref) => {
    const { backgroundTemplate } = props
    const [select, setSelect] = useState(true)
    const [company, setCompany] = useState(props)
    // console.log(company)
    const [number, setNumber] = useState({ props, select: false })
    const [email, setEmail] = useState(props)
    const [img, setImg] = useState('')
    const [backg, setBackg] = useState(props.backImage)
    const [width, setWidth] = useState('650px')
    const [height, setHeight] = useState('350px')

    const textSelect = () => {
        setSelect(!select)
    }
    const handleImageUpload = (e) => {
        // console.log(e.target.files[0])
        setImg(e.target.files[0])
    }

    useEffect(() => {
        setCompany(props);
    }, [props]);

    useEffect(() => {
        setNumber(props);
    }, [props]);

    useEffect(() => {
        setEmail(props);
    }, [props]);

    const clickText = document.querySelectorAll('p');
    clickText.forEach(item => {
        item.addEventListener('click', event => {
            const color = props.selectedColor;
            event.target.style.color = color

        })
    })

    const [targetNode, setTargetNode] = useState();
    const [showRuler, setShowRuler] = useState(false);

    const onDrag = (e, { x, y, node }) => {
        setShowRuler(true);
        setTargetNode({ left: x, top: y + node.offsetTop, height: node.clientHeight });
    }
    console.log(backgroundTemplate.cardB1);

    return (
        <div className="canva-board" >
            <input type="text" placeholder="width" value={width} onChange={(e) => setWidth(e.target.value)} />
            <input type="text" placeholder="height" value={height} onChange={(e) => setHeight(e.target.value)} /> <br />
            {showRuler && <Ruler node={targetNode} />}
            <input type="file" onChange={handleImageUpload}></input>

            <div ref={ref} id="can" style={{ width: width, backgroundColor: props.changeBack, backgroundImage: `url(${backgroundTemplate.cardB1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: height, border: '1px solid black', position: 'absolute', margin: '200px' }}>

                <div>
                    {
                        props.items && props.items.map(item => {
                            return (
                                <h2>{item.title}</h2>
                            )
                        })
                    }
                </div>

                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>


                    <div style={{ width: props.imageSize, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        {img && showRuler && (
                            <div
                                style={{
                                    height: props.imageSize + 'px',
                                    width: props.imageSize + 'px',
                                    border: '1px solid',
                                    opacity: '0.2',
                                    background: 'gray'
                                }}
                            />
                        )}
                        {img && !showRuler && (
                            <div
                                style={{
                                    height: props.imageSize + 'px',
                                    width: props.imageSize + 'px',
                                    backgroundSize: 'cover',
                                    backgroundImage: `url(${URL.createObjectURL(img)})`
                                }}
                            />
                        )}
                        {/*{img && <img src={URL.createObjectURL(img)} style={{ width: props.imageSize + 'px', userDrag: 'none'  }}></img>}*/}
                    </div>

                </Draggable>
                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 250, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, fontSize: props.changeFsize }} onClick={textSelect} >{props.company}   </p>
                    </div>
                </Draggable>

                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, fontSize: props.changeFsize }}  >{props.number}</p>
                    </div>
                </Draggable>

                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, fontSize: props.changeFsize }} >{props.address}</p>
                    </div>
                </Draggable>

                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, fontSize: props.changeFsize }} >{props.email}</p>
                    </div>
                </Draggable>

                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, color: 'black' }} >{props.text1}</p>
                    </div>
                </Draggable>

                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, color: 'black' }} >{props.text2}</p>
                    </div>
                </Draggable>
                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, color: 'black' }} >{props.text3}</p>
                    </div>
                </Draggable>
                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, color: 'black' }} >{props.text4}</p>
                    </div>
                </Draggable>
                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, color: 'black' }} >{props.text5}</p>
                    </div>
                </Draggable>
                <Draggable bounds="parent" onDrag={onDrag} onStop={() => setShowRuler(false)}>
                    <div style={{ width: 150, position: 'relative', cursor: showRuler ? 'move' : '' }}>
                        <p style={{ fontFamily: props.changeFont, color: 'black' }} >{props.text6}</p>
                    </div>
                </Draggable>
            </div>


        </div >
    )
}
);

const MyComponent = (props) => {
    const componentRef = useRef();
    return (
        <React.Fragment>
            <CanvaNew {...props} ref={componentRef} />
            <button onClick={() => exportComponentAsJPEG(componentRef)} className="btn-download">
                Export As JPEG
            </button>

            <button onClick={() => exportComponentAsPNG(componentRef)} className="btn-download">
                Export As PNG
            </button>
        </React.Fragment>);
}

export default MyComponent;
