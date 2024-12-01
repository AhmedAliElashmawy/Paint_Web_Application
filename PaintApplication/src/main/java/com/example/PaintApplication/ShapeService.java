package com.example.PaintApplication;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

@Service
public class ShapeService {

    private Stack<List<Shape>> undoStack = new Stack<>();
    private Stack<List<Shape>> redoStack = new Stack<>();
    private Shape copiedShape = null;
    // Add a shape to the list
    public void addShape(Shape shape) {
        saveStateForUndo();
        Shape.addShape(shape);
        redoStack.clear(); // Clear redo stack on new action
    }

    // Get all shapes
    public List<Shape> getAllShapes() {
        return Shape.getShapes();
    }

    // Clear all shapes
    public void clearShapes() {
        saveStateForUndo();
        Shape.clearShapes();
        redoStack.clear(); // Clear redo stack on new action
    }

    // Copy a shape
    public void copyShape(int shapeId) {
        saveStateForUndo();
        Shape shapeToCopy = Shape.getShapes().stream()
                .filter(shape -> shape.getId() == shapeId)
                .findFirst()
                .orElse(null);
        if (shapeToCopy != null) {
           copiedShape=shapeToCopy.clone();
           // Clear redo stack on new action
        }

    }
    public void pasteShape(){
        if(copiedShape!=null){
            saveStateForUndo();
            Shape.addShape(copiedShape.clone());
            redoStack.clear();
        }
    }
    public void deleteShape(int shapeId) {
        saveStateForUndo();
        Shape.getShapes().removeIf(shape -> shape.getId() == shapeId);
        redoStack.clear();
    }
    public void undo() {
        if (!undoStack.isEmpty()) {
            redoStack.push(new ArrayList<>(Shape.getShapes()));
            List<Shape> previousState = undoStack.pop();
            Shape.setShapes(previousState);
        }

    }
    // Redo the last undone action
    public void redo() {
        if (!redoStack.isEmpty()) {
            undoStack.push(new ArrayList<>(Shape.getShapes()));
            List<Shape> nextState = redoStack.pop();
            Shape.setShapes(nextState);
        }
    }
    public void loadShapes(List<Shape> shapes) {
        saveStateForUndo();
        Shape.setShapes(new ArrayList<>(shapes)); // Replace the current shapes with the provided shapes
        redoStack.clear(); // Clear redo stack on new action
    }

    // Save the current state for undo functionality
    private void saveStateForUndo() {
        undoStack.push(new ArrayList<>(Shape.getShapes()));
    }
}
