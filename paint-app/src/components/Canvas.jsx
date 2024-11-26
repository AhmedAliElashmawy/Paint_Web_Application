// src/components/Canvas.jsx
import React from 'react';
import { Stage, Layer, Circle, Rect, Line } from 'react-konva';

const Canvas = ({ shapes, setShapes, selectedShape }) => {
  const handleCanvasClick = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (selectedShape) {
      const newShape = {
        type: selectedShape,
        x: pointerPosition.x,
        y: pointerPosition.y,
        size: 50,
        color: 'blue',
      };

      setShapes([...shapes, newShape]);
    }
  };

  return (
    <Stage
      width={1919}
      height={800}
      onClick={handleCanvasClick}
      style={{ border: '1px solid black' }}
    >
      <Layer>
        {shapes.map((shape, index) => {
          if (shape.type === 'circle') {
            return (
              <Circle
                key={index}
                x={shape.x}
                y={shape.y}
                radius={shape.size}
                fill={shape.color}
              />
            );
          }
          if (shape.type === 'rectangle') {
            return (
              <Rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.size}
                height={shape.size}
                fill={shape.color}
              />
            );
          }
          if (shape.type === 'line') {
            return (
              <Line
                key={index}
                points={[shape.x, shape.y, shape.x + 50, shape.y + 50]}
                stroke={shape.color}
              />
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
