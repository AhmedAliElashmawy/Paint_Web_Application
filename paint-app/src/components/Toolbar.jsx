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

    const menu1Buttons = [
        { id: 2, label: "Save", icon: "/icons/save.svg" },
        { id: 1, label: "Load", icon: "" },
        { id: 3, label: "Copy", icon: "/icons/copy.svg" },
    ];
    
    const menu2Buttons = [
        { id: 10, label: "Undo" , icon: "/icons/undo.svg"},
        { id: 11, label: "Redo" , icon: "/icons/redo.svg" },
        { id: 12, label: "Paste" , icon: "/icons/paste.svg"},
    ]

    const menu3Buttons = [
        { id: 4, label: "Eraser", icon: "/icons/eraser.svg" },
        { id: 5, label: "Pencil", icon: "/icons/pencil.svg" },
        { id: 6, label: "Airbrush", icon: "/icons/airbrush.png" },
        ]

    const menu4Buttons = [
        { id: 13, label: "Flood fill"  },
        { id: 14, label: "Brush" , icon: "/icons/brush.svg"},
        { id: 15, label: "Text" , icon: "/icons/text.svg" },
        ]

    const menu5Buttons = [
        { id: 19, label: "Outline only" },
        { id: 20, label: "Fill only" },
        { id: 21, label: "Outline and fill" },
        ]

    const shapes = [
        { id: "square", label: "Square", icon: "" },
        { id: "rectangle", label: "Rectangle", icon: "/icons/rectangle.svg" },
        { id: "circle", label: "Circle", icon: "" },
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
        <div className="topbar">
            <div className="toolbox">
                    <ButtonGroup buttons={menu1Buttons} />
                    <br />
                    <ButtonGroup buttons={menu2Buttons} />
            </div>
            <span className="divider"></span>
            <div className="toolbox">
                    <ButtonGroup buttons={menu3Buttons} />
                    <br />
                    <ButtonGroup buttons={menu4Buttons} />
            </div>
            <span className="divider"></span>
            <div style={styles.container}>
              <div style={styles.grid}>
              {shapes.map((shape) => (
                  <button
                  key={shape.id}
                  style={styles.button}
                  title={shape.label}
                  >
                        <img
                            src={shape.icon}
                            alt={shape.label}
                            className="button-icon"
                        />
                        </button>
                  ))}
                  </div>
                  </div>
                  <span className="divider"></span>
                  <div className="toolbox">
                  <LineWidthMenu
                    lineWidths={lineWidths}
                      selectedWidth={selectedWidth}
                      onChange={(width) => setSelectedWidth(Number(width))}
                  />
                  <br/>
                  <ButtonGroup buttons={menu5Buttons} />
                  </div>
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
                  <div className="toolcolorsbox">
                <ColorOptions colors={row1Colors} onColorSelect={handleColorSelect} />
                    <br />
                <ColorOptions colors={row2Colors} onColorSelect={handleColorSelect} />
            </div>
        </div>
        );
    };

const styles = {
    container: {
        height: "80px",
        padding: "10px",
        borderRight: "1px solid gray",
        backgroundColor: "#f0f0f0",
        clipPath: "inset(0 0 10px 0)",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(10, 35px)",
        gap: "15px",
    },
    button: {
        width: "30px",
        height: "30px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "white",
        fontSize: "13px",
        textAlign: "center",
        cursor: "pointer",
    },
};

    export default Toolbar;
