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
        { id: 1, label: "Clear", icon: "/icons/clear.svg" },
        { id: 2, label: "Save", icon: "/icons/save.svg" },
        { id: 3, label: "Copy", icon: "/icons/copy.svg" },
        "divider",
        { id: 4, label: "Eraser", icon: "/icons/eraser.svg" },
        { id: 5, label: "Pencil", icon: "/icons/pencil.svg" },
        { id: 6, label: "Airbrush", icon: "/icons/airbrush.png" },
        { id: 7, label: "Line", icon: "/icons/line.svg" },
        { id: 8, label: "Circle", icon: "" },
        { id: 9, label: "Ellipse", icon: "/icons/ellipse.svg" },
        "divider",
      ];

      const row2Buttons = [
        { id: 10, label: "Undo" , icon: "/icons/undo.svg"},
        { id: 11, label: "Redo" , icon: "/icons/redo.svg" },
        { id: 12, label: "Paste" , icon: "/icons/paste.svg"},
        "divider",
        { id: 13, label: "Flood fill"  },
        { id: 14, label: "Brush" , icon: "/icons/brush.svg"},
        { id: 15, label: "Text" , icon: "/icons/text.svg" },
        { id: 16, label: "Triangle" , icon: ""},
        { id: 17, label: "Square" , icon: ""},
        { id: 8, label: "Rectangle", icon: "/icons/rectangle.svg" },
        "divider",
        { id: 19, label: "Outline only" },
        { id: 20, label: "Fill only" },
        { id: 21, label: "Outline and fill" },
    ];

    const shapes = [
        { id: "line", label: "Line", icon: "━" },
        { id: "curve", label: "Curve", icon: "〰" },
        { id: "rectangle", label: "Rectangle", icon: "▭" },
        { id: "roundedRectangle", label: "Rounded Rectangle", icon: "⬛" },
        { id: "ellipse", label: "Ellipse", icon: "⬤" },
        { id: "triangle", label: "Triangle", icon: "▲" },
        { id: "diamond", label: "Diamond", icon: "◆" },
        { id: "pentagon", label: "Pentagon", icon: "⬟" },
        { id: "hexagon", label: "Hexagon", icon: "⬢" },
        { id: "arrow", label: "Arrow", icon: "➔" },
        { id: "star", label: "Star", icon: "★" },
        { id: "heart", label: "Heart", icon: "❤" },
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
                {/* <div style={styles.container}>
                <div style={styles.grid}>
                    {shapes.map((shape) => (
                    <button
                        key={shape.id}
                        style={styles.button}
                        title={shape.label}
                    >
                        {shape.icon}
                    </button>
                    ))}
                </div>
                </div> */}
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
const styles = {
    container: {
      padding: "10px",
      borderRight: "1px solid gray",
      backgroundColor: "#f0f0f0",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 10px)",
      gap: "10px",
    },
    button: {
      width: "10px",
      height: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: "white",
      fontSize: "5px",
      textAlign: "center",
      cursor: "pointer",
    },
  };
export default Toolbar;
