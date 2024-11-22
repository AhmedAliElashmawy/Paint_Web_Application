import React, { useState } from "react";
import "./Toolbar.css";

const ColorOptions = ({ colors, onColorSelect }) => (
    <div className="color-options">
        {colors.map((color, index) => (
            <span
                key={index}
                className="color-circle"
                style={{ backgroundColor: color }}
                title={color}
                onClick={() => onColorSelect(color)}
            ></span>
        ))}
    </div>
);

const ButtonGroup = ({ buttons }) => (
    <div className="buttons">
        {buttons.map((button, index) =>
            button === "divider" ? (
                <div key={index} className="divider">|</div>
            ) : (
                <button key={index} title={button.label || button}>
                    {button.icon ? (
                        <img
                            src={button.icon}
                            alt={button.label}
                            className="button-icon"
                        />
                    ) : (
                        button.label || button
                    )}
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
    const [selectedWidth, setSelectedWidth] = useState(1);
    const [selectedColor, setSelectedColor] = useState("#000000");

    const row1Buttons = [
        { id: 1, label: "Clear", icon: "/icons/clear.webp" },
        { id: 2, label: "Save", icon: "/icons/save.jpg" },
        { id: 3, label: "Copy", icon: "/icons/copy.webp" },
        "divider",
        { id: 4, label: "Eraser", icon: "/icons/eraser.png" },
        { id: 5, label: "Pencil", icon: "/icons/pencil.jpg" },
        { id: 6, label: "Airbrush", icon: "/icons/airbrush.png" },
        { id: 7, label: "Line", icon: "/icons/line.png" },
        { id: 8, label: "Rectangle", icon: "/icons/rectangle.png" },
        { id: 9, label: "Oval", icon: "/icons/oval.jpg" },
        "divider",
      ];

      const row2Buttons = [
        { id: 10, label: "Undo" },
        { id: 11, label: "Redo" },
        { id: 12, label: "Paste" },
        "divider",
        { id: 13, label: "Flood fill" },
        { id: 14, label: "Brush" },
        { id: 15, label: "Text" },
        { id: 16, label: "Curve" },
        { id: 17, label: "Polygon" },
        { id: 18, label: "Rounded Rectangle" },
        "divider",
        { id: 19, label: "Outline only" },
        { id: 20, label: "Fill only" },
        { id: 21, label: "Outline and fill" },
    ];

    const row1Colors = ["black", "red", "green", "blue", "yellow"];
    const row2Colors = ["purple", "orange", "pink", "cyan", "lime"];

    const lineWidths = [1, 2, 4, 8, 16]; // Available line widths

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleBigColorChange = (color) => {
        setSelectedColor(color);
    };

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
                <div className="color-picker-container">
                    <button
                        className="big-color-button"
                        style={{ backgroundColor: selectedColor }}
                        title="Pick any color"
                    >
                        <span className="big-color-label">+</span>
                    </button>
                    <input
                        type="color"
                        className="big-color-input"
                        value={selectedColor}
                        onChange={(e) => handleBigColorChange(e.target.value)}
                    />
                </div>
                <ColorOptions colors={row1Colors} onColorSelect={handleColorSelect} />
            </div>
            {/* Row 2 */}
            <div className="row">
                <ButtonGroup buttons={row2Buttons} />
                <ColorOptions colors={row2Colors} onColorSelect={handleColorSelect} />
            </div>
        </div>
    );
};

export default Toolbar;
