package com.example.PaintApplication;

<<<<<<< Updated upstream
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

@Service
public class ShapeService {
        @Autowired
        private ShapeRepository shapeRepository;
    private final Deque<List<Shape>> undoStack = new ArrayDeque<>();
    private final Deque<List<Shape>> redoStack = new ArrayDeque<>();   
    public List<Shape> getAllShapes() {
        return shapeRepository.findAll();
    }
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(RuntimeException.class)
    public String handleNotFoundException(RuntimeException e) {
        return e.getMessage();
=======
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
>>>>>>> Stashed changes
    }

    // Get all shapes
    public List<Shape> getAllShapes() {
        return Shape.getShapes();
    }
<<<<<<< Updated upstream
    public Shape saveShape(Shape shape) {
        saveToUndoStack();
        return shapeRepository.save(shape);
    }
    public void deleteShape(Long id) {
        saveToUndoStack();
        shapeRepository.deleteById(id);
    }
    public Shape updateShape(Long id, Shape updatedShape) {
        saveToUndoStack();
        Shape existingShape = getShapeById(id);
        existingShape.setX(updatedShape.getX());
        existingShape.setY(updatedShape.getY());
        existingShape.setColor(updatedShape.getColor());
        existingShape.setVisible(updatedShape.isVisible());
        return shapeRepository.save(existingShape);
    }
    public Shape resizeShape(Long id, double factor) {
        saveToUndoStack();
        Shape shape = getShapeById(id);
        if (shape instanceof EllipticalShape) {
            EllipticalShape elliptical = (EllipticalShape) shape;
            elliptical.setRadius1(elliptical.getRadius1() * factor);
            elliptical.setRadius2(elliptical.getRadius2() * factor);
        }
        else if(shape instanceof LineSegment){
            LineSegment Line =(LineSegment) shape;
            Line.setLength(Line.getLength()*factor);
            Line.setAngle(Line.getAngle()%360);
        }
        else if (shape instanceof Rectangle) {
            Rectangle rectangle = (Rectangle) shape;
            rectangle.setWidth(rectangle.getWidth() * factor);
            rectangle.setHeight(rectangle.getHeight() * factor);
        }
        else if(shape instanceof Square){
            Square square = (Square) shape;
            square.setWidth(square.getWidth() * factor);
        }
        else if(shape instanceof Triangle){
            Triangle triangle = (Triangle) shape;
            triangle.setX1((int) (triangle.getX1() * factor));
            triangle.setX2((int) (triangle.getX2() * factor));
            triangle.setX3((int) (triangle.getX3() * factor));
        }
        return shapeRepository.save(shape);
=======

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

>>>>>>> Stashed changes
    }
    public void pasteShape(){
        if(copiedShape!=null){
            saveStateForUndo();
            Shape.addShape(copiedShape.clone());
            redoStack.clear();
        }
    }

    // Undo the last action
    public void undo() {
        if (!undoStack.isEmpty()) {
<<<<<<< Updated upstream
            redoStack.push((List<Shape>) new ArrayDeque<>(shapeRepository.findAll()));
=======
            redoStack.push(new ArrayList<>(Shape.getShapes()));
>>>>>>> Stashed changes
            List<Shape> previousState = undoStack.pop();
            Shape.setShapes(previousState);
        }

    }
    // Redo the last undone action
    public void redo() {
        if (!redoStack.isEmpty()) {
<<<<<<< Updated upstream
            undoStack.push((List<Shape>) new ArrayDeque<>(shapeRepository.findAll()));
=======
            undoStack.push(new ArrayList<>(Shape.getShapes()));
>>>>>>> Stashed changes
            List<Shape> nextState = redoStack.pop();
            Shape.setShapes(nextState);
        }
    }
<<<<<<< Updated upstream
    private void saveToUndoStack() {
        List<Shape> currentShapes = shapeRepository.findAll();
        List<Shape> deepCopy = new ArrayList<>();
        for (Shape shape : currentShapes) {
            deepCopy.add(shape.clone());
        }
        undoStack.push(deepCopy);
        redoStack.clear();
=======
    public void loadShapes(List<Shape> shapes) {
        saveStateForUndo();
        Shape.setShapes(new ArrayList<>(shapes)); // Replace the current shapes with the provided shapes
        redoStack.clear(); // Clear redo stack on new action
    }

    // Save the current state for undo functionality
    private void saveStateForUndo() {
        undoStack.push(new ArrayList<>(Shape.getShapes()));
>>>>>>> Stashed changes
    }
}
