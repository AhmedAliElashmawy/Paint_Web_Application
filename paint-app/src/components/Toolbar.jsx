import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import "./Toolbar.css";

const Toolbar = ({
  selectedShape,
  onShapeSelect,
  selectedColor,
  onColorSelect,
  selectedSize,
  onSizeChange,
  selectedFill,
  setFillSelect,
  selectedPencil,
  setselectedPencil,
  setselectedBrush,
  setselectedEraser,
  setselectedAirbrush,
  setselectedFloodFill,
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
          <button key={index} title={button.label || button} onClick={() => ButtonFunctions(button.label)}>
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

  const ButtonFunctions = async (button) => {
    onShapeSelect(null);
    setselectedPencil(false);
    setselectedBrush(false);
    setselectedEraser(false);
    setFillSelect(false);
    setselectedEraser(false)
    setselectedAirbrush(false);
    setselectedFloodFill(false);
    switch (button) {
      case "Flood":
      setselectedFloodFill(true);
      break;

      case "Airbrush":
      setselectedAirbrush(true);
      break;

      case "Eraser":
      setselectedEraser(true);
      break;

      case "Pencil":
      setselectedPencil(true);
      break;

      case "Brush":
      setselectedBrush(true);
      break;

      case "Outline only":
        setFillSelect(false);
        break;

      case "Fill":
        setFillSelect(true); // Assuming `setFillSelect` is a state updater
        break;
  
        case "Save":
    try {
        const response = await axios.post('http://localhost:8080/api/shapes/save', null, {
            params: {
                format: "json", // Specify format
                filePath: "C:/Temp/sketch.json"
                }
        });
        console.log('Shapes saved successfully:', response.data);
    } catch (error) {
        console.error('Did not save');
        if (error.response) {
            console.error('Server responded with error:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
    break;

    case "Load":
      const response = await axios.post('http://localhost:8080/api/shapes/load', null, {
        params: {
            format: "json", // or "xml"
            filePath: "C:/Temp/sketch.json"
        }
    });
    console.log(response.data);
    break;

        
        default:
        console.warn(`Unknown button action: ${button}`);
    }
  };
  

  const ShapeSelector = ({ shapes }) => (
    <div style={styles.container}>
      <div style={styles.grid}>
        {shapes.map((shape) => (
          <button
            onClick={() => {
              onShapeSelect(shape.label)
              setselectedPencil(false);
              setselectedBrush(false);
              setselectedEraser(false);
              setselectedAirbrush(false);
              setselectedFloodFill(false);
            }}
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
      { label: "Flood" },
      { label: "Brush", icon: "/icons/brush.svg" },
      { label: "Text", icon: "/icons/text.svg" },
    ],
    menu5: [
      { label: "Outline only" },
      { label: "Fill" },
      { label: "Outline and fill" },
    ],
  };

  const shapes = [
    { id: uuidv4(), label: "Square" },
    { id: uuidv4(), label: "Rectangle", icon: "/icons/rectangle.svg" },
    { id: uuidv4(), label: "Circle" },
    { id: uuidv4(), label: "Ellipse" },
    { id: uuidv4(), label: "LineSegment" },
    { id: uuidv4(), label: "Triangle" },
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
