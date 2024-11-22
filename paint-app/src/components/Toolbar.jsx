import React from "react";
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

const Toolbar = () => {
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
    ];

    const row1Colors = ["black", "red", "green", "blue", "yellow"];
    const row2Colors = ["purple", "orange", "pink", "cyan", "lime"];
    return (
        <div className="toolbar">
            {/* Row 1 */}
            <div className="row">
                <ButtonGroup buttons={row1Buttons} />
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
