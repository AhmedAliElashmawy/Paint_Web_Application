import React, { useState } from "react";
import "./Toolbar.css";

const ColorOptions = ({ colors }) => (
    <div className="color-options">
        {colors.map((color, index) => (
            <span
                key={index}
                className="color-circle"
                style={{ backgroundColor: color }}
                title={color}
            ></span>
        ))}
    </div>
);

const ButtonGroup = ({ buttons }) => (
    <div className="buttons">
        {buttons.map((button, index) =>
            button === "divider" ? (
                <div key={index} className="divider"></div>
            ) : (
                <button key={index} title={button}>
                    {button}
                </button>
            )
        )}
    </div>
);

const LineWidthMenu = ({ lineWidths, selectedWidth, onChange }) => (
    <div className="line-width-menu">
        <label htmlFor="line-width">Line Width:</label>
        <select
            id="line-width"
            value={selectedWidth}
            onChange={(e) => onChange(e.target.value)}
        >
            {lineWidths.map((width, index) => (
                <option key={index} value={width}>
                    {width}px
                </option>
            ))}
        </select>
    </div>
);

const Toolbar = () => {
    const [selectedWidth, setSelectedWidth] = useState(1); // Default line width

    const row1Buttons = [
        "Clear",
        "Save",
        "Copy",
        "divider",
        "Eraser",
        "Pencil",
        "Airbrush",
        "Line",
        "Rectangle",
        "Oval",
        "divider",
    ];

    const row2Buttons = [
        "Undo",
        "Redo",
        "Paste",
        "divider",
        "Flood fill",
        "Brush",
        "Text",
        "Curve",
        "Polygon",
        "Rounded Rectangle",
        "divider",
        "Outline only",
        "Fill only",
        "Outline and fill",
    ];

    const row1Colors = ["black", "red", "green", "blue", "yellow"];
    const row2Colors = ["purple", "orange", "pink", "cyan", "lime"];

    const lineWidths = [1, 2, 4, 8, 16]; // Available line widths

    return (
        <div className="toolbar">
            {/* Row 1 */}
            <div className="row">
                <ButtonGroup buttons={row1Buttons} />
                <LineWidthMenu
                    lineWidths={lineWidths}
                    selectedWidth={selectedWidth}
                    onChange={(width) => setSelectedWidth(Number(width))}
                />
                <ColorOptions colors={row1Colors} />
            </div>
            {/* Row 2 */}
            <div className="row">
                <ButtonGroup buttons={row2Buttons} />
                <ColorOptions colors={row2Colors} />
            </div>
        </div>
    );
};

export default Toolbar;
