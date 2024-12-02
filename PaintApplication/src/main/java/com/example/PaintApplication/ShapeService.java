package com.example.PaintApplication;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import org.springframework.stereotype.Service;

@Service
public class ShapeService {
    private Stack<Shape> undoStack = new Stack<>();
    private Stack<Shape> redoStack = new Stack<>();
    private Shape copiedShape = null;
    // Add a shape to the list
    public void addShape(Shape shape) {
        saveStateForUndo(shape);
        Shape.addShape(shape);
        redoStack.clear();
    }

    // Get all shapes
    public List<Shape> getAllShapes() {
        return Shape.getShapes();
    }

    // Clear all shapes
    public void clearShapes() {
        Shape.clearShapes();
        redoStack.clear(); // Clear redo stack on new action
        undoStack.clear(); // Clear redo stack on new action
    }

    // public void clearShape(Shape shape) {
    //     Shape.delete(shape);
    //     redoStack.clear();
    // }

    // Copy a shape
    // public void copyShape(String shapeId) {
    //     saveStateForUndo();
    //     Shape shapeToCopy = Shape.getShapes().stream()
    //             .filter(shape -> shape.getId().equals(shapeId))
    //             .findFirst()
    //             .orElse(null);
    //     if (shapeToCopy != null) {
    //        copiedShape=shapeToCopy.clone();
    //        // Clear redo stack on new action
    //     }

    // }
    // public void pasteShape(){
    //     if(copiedShape!=null){
    //         saveStateForUndo();
    //         Shape.addShape(copiedShape.clone());
    //         redoStack.clear();
    //     }
    // }
    public void deleteShape(Shape shape) {
        Shape.delete(shape);
        // Remove the shape from the list

        // Save the current state for undo
        saveStateForUndo(shape);
        System.out.println(shape);

        // Clear the redo stack
        redoStack.clear();
    }
    public Shape undo() {
        if (!undoStack.isEmpty()) {
            Shape shape = undoStack.pop();
            redoStack.push(shape);
            Shape.UndoShape();
            return shape;
        }
        return null;
    }
    // Redo the last undone action
    public Shape redo() {
        if (!redoStack.isEmpty()) {
            Shape shape = redoStack.pop();
            undoStack.push(shape);
            Shape.addShape(shape);
            return shape;
        }
        return null;
    }
    public void loadShapes(List<Shape> shapes) {
        Shape.setShapes(new ArrayList<>(shapes)); // Replace the current shapes with the provided shapes
        redoStack.clear(); // Clear redo stack on new action
    }

    // Save the current state for undo functionality
    private void saveStateForUndo(Shape shape) {
        undoStack.push(shape);
    }
}
