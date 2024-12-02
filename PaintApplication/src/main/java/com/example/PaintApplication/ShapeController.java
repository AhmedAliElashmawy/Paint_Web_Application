package com.example.PaintApplication;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {

    @Autowired
    private ShapeService shapeService;

    // Add a shape
    @PostMapping
    public Shape addShape(@RequestBody Shape shape) {
        shapeService.addShape(shape);
        return shape;
    }

    // Get all shapes
    @GetMapping
    public List<Shape> getAllShapes() {
        return shapeService.getAllShapes();
    }

    // Clear all shapes
    @DeleteMapping
    public void clearShapes() {
        shapeService.clearShapes();
    }

    // Copy a shape
    // @PostMapping("/copy/{id}")
    // public void copyShape(@PathVariable int id) {
    //     shapeService.copyShape(id);
    // }
    // @PostMapping("/paste")
    // public void pasteShape() {
    //     shapeService.pasteShape();
    // }
    // Undo the last action
    @PostMapping("/undo")
    public Shape undo() {
        Shape shape = shapeService.undo();
        return shape;
    }

    // Redo the last undone action
    @PostMapping("/redo")
    public Shape redo() {
        Shape shape = shapeService.redo();
        return shape;
    }
    @PostMapping("/load")
    public void loading(@RequestBody List<Shape> shapes) {
        shapeService.loadShapes(shapes);
    }
}