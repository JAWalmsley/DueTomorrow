import { Paper } from '@mui/material';

import React from 'react';
import { CustomPicker } from 'react-color';


const { EditableInput } = require('react-color/lib/components/common');

const inlineStyles = {
    swatchSquare: {
        width: 32,
        height: 32,
        margin: '1px 2px',
        cursor: 'pointer',
    },
    hex: {
        input: {
            width: '10ch',
            backgroundColor: '#00000000',
            border: 'none',
        },
    },
};

class DTColourPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hex: this.props.colour,
        };
    }

    static getDerivedStateFromProps(nextProps) {
        const colour = nextProps.colour;
        return {
            hex: colour,
        };
    }

    displayColorSwatches = (colors) => {
        return colors.map((color) => {
            return (
                <Paper
                    onClick={() => this.props.onChange(color)}
                    key={color}
                    style={{
                        ...inlineStyles.swatchSquare,
                        backgroundColor: color,
                    }}
                />
            );
        });
    };

    render() {
        return (
            <Paper elevation={2}>
                {this.props.colours.length && (
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            flexWrap: 'wrap',
                        }}
                    >
                        {this.displayColorSwatches(this.props.colours)}
                    </div>
                )}
                <EditableInput
                    style={{
                        input: {
                            ...inlineStyles.hex.input,
                            color: '#fff',
                        },
                    }}
                    value={this.state.hex}
                    onChange={this.props.onChange}
                />
                <Paper
                    elevation={3}
                    style={{
                        backgroundColor: this.state.hex,
                        width: '100%',
                        height: '8px',
                    }}
                ></Paper>
            </Paper>
        );
    }
}

export default CustomPicker(DTColourPicker);
