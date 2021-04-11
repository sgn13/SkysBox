import React, { PureComponent } from 'react';

const defaultStyleValue = {
  anchor: { x: 0.5, y: 0.5 },
  borderColor: 'silver',
  borderStyle: 'dashed',
  borderWidth: 2
}

export class Line extends PureComponent {
  componentDidMount() {
    this.within.appendChild(this.el);
  }

  componentWillUnmount() {
    this.within.removeChild(this.el);
  }

  render() {
    const { x0, y0, x1, y1 } = this.props;

    this.within = document.body;

    const dy = y1 - y0;
    const dx = x1 - x0;

    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const length = Math.sqrt(dx * dx + dy * dy);

    const positionStyle = {
      position: 'absolute',
      top: `${y0}px`,
      left: `${x0}px`,
      width: `${length}px`,
      zIndex: '0',
      transform: `rotate(${angle}deg)`,
      transformOrigin: '0 0',
    };

    const defaultStyle = {
      borderTopColor: defaultStyleValue.borderColor,
      borderTopStyle: defaultStyleValue.borderStyle,
      borderTopWidth: defaultStyleValue.borderWidth,
    };

    const props = {
      className: this.props.className,
      style: Object.assign({}, defaultStyle, positionStyle),
    }

    return (
      <div className="placeholder">
        <div
          ref={(el) => { this.el = el; }}
          {...props}
        />
      </div>
    );
  }
}
