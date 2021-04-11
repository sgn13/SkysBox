import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

class Shapes extends Component {
    state = {}
    render() {
        return (<div>
            <h3>Choose your Shapes</h3>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Text text="Some text on canvas" fontSize={15} />
                    <Rect
                        x={20}
                        y={50}
                        width={100}
                        height={100}
                        draggable
                        fill="red"
                    />
                    <Circle x={200} y={100} radius={50} fill="green" draggable />
                    <Line
                        x={20}
                        y={200}
                        points={[0, 100, 100, 0, 100, 50]}
                        tension={0.5}
                        closed
                        stroke="black"
                        draggable
                        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
                        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                        fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
                    />
                </Layer>
            </Stage>

        </div>);
    }
}

export default Shapes;