import React, { useState } from "react";
import "./Toolbar.css";

const Toolbar = ({
  selectedShape,
  onShapeSelect,
  selectedColor,
  onColorSelect,
  selectedSize,
  onSizeChange,
}) => {
  const [selectedWidth, setSelectedWidth] = useState(selectedSize || 1);
  const [currentColor, setCurrentColor] = useState(selectedColor || "#000000");

  const handleColorSelect = (color) => {
    setCurrentColor(color);
    onColorSelect(color); // Notify parent
  };

  const handleSizeChange = (size) => {
    setSelectedWidth(size);
    onSizeChange(size); // Notify parent
  };

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
                alt={button.label || "icon"}
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

  const ShapeSelector = ({ shapes }) => (
    <div style={styles.container}>
      <div style={styles.grid}>
        {shapes.map((shape) => (
          <button
            onClick={() => onShapeSelect(shape.id)}
            key={shape.id}
            style={styles.button}
            title={shape.label}
          >
            {shape.icon ? (
              <img
                src={shape.icon}
                alt={shape.label}
                className="button-icon"
              />
            ) : (
              shape.label
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const LineWidthMenu = ({ lineWidths, selectedWidth, onChange }) => (
    <div className="line-width-menu">
      <label htmlFor="line-width">Line Width:</label>
      <select
        id="line-width"
        value={selectedWidth}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {lineWidths.map((width, index) => (
          <option key={index} value={width}>
            {width}px
          </option>
        ))}
      </select>
    </div>
  );

  const buttonsConfig = {
    menu1: [
      { label: "Save", icon: "/icons/save.svg" },
      { label: "Load" },
      { label: "Copy", icon: "/icons/copy.svg" },
    ],
    menu2: [
      { label: "Undo", icon: "/icons/undo.svg" },
      { label: "Redo", icon: "/icons/redo.svg" },
      { label: "Paste", icon: "/icons/paste.svg" },
    ],
    menu3: [
      { label: "Eraser", icon: "/icons/eraser.svg" },
      { label: "Pencil", icon: "/icons/pencil.svg" },
      { label: "Airbrush", icon: "/icons/airbrush.png" },
    ],
    menu4: [
      { label: "Flood fill" },
      { label: "Brush", icon: "/icons/brush.svg" },
      { label: "Text", icon: "/icons/text.svg" },
    ],
    menu5: [
      { label: "Outline only" },
      { label: "Fill only" },
      { label: "Outline and fill" },
    ],
  };

  const shapes = [
    { id: "square", label: "Square" },
    { id: "rectangle", label: "Rectangle", icon: "/icons/rectangle.svg" },
    { id: "circle", label: "Circle" },
  ];

  const row1Colors = ["black", "red", "green", "blue", "yellow"];
  const row2Colors = ["purple", "orange", "pink", "cyan", "lime"];
  const lineWidths = [1, 2, 4, 8, 16];

  return (
    <div className="topbar">
      <div className="toolbox">
        <ButtonGroup buttons={buttonsConfig.menu1} />
        <br />
        <ButtonGroup buttons={buttonsConfig.menu2} />
      </div>
      <span className="divider"></span>
      <div className="toolbox">
        <ButtonGroup buttons={buttonsConfig.menu3} />
        <br />
        <ButtonGroup buttons={buttonsConfig.menu4} />
      </div>
      <span className="divider"></span>
      <ShapeSelector shapes={shapes} />
      <span className="divider"></span>
      <div className="toolbox">
        <LineWidthMenu
          lineWidths={lineWidths}
          selectedWidth={selectedWidth}
          onChange={handleSizeChange}
        />
        <br />
        <ButtonGroup buttons={buttonsConfig.menu5} />
      </div>
      <div className="color-picker-container">
        <button
          className="big-color-button"
          style={{ backgroundColor: currentColor }}
          title="Pick any color"
        >
          <span className="big-color-label">+</span>
        </button>
        <input
          type="color"
          className="big-color-input"
          value={currentColor}
          onChange={(e) => handleColorSelect(e.target.value)}
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
