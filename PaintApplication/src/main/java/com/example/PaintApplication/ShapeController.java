package com.example.PaintApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {

    @Autowired
    private ShapeService shapeService;

    // Add a shape
    @PostMapping
    public void addShape(@RequestBody Shape shape) {
        shapeService.addShape(shape);
    }

    // Get all shapes
    @GetMapping
    public List<Shape> getAllShapes() {
        return shapeService.getAllShapes();
    }
    // Copy a shape
    @PostMapping("/copy/{id}")
    public void copyShape(@PathVariable int id) {
        shapeService.copyShape(id);
    }
    @PostMapping("/paste")
    public void pasteShape() {
        shapeService.pasteShape();
    }
    // Undo the last action
    @PostMapping("/undo")
    public void undo() {
        shapeService.undo();
    }

    // Redo the last undone action
    @PostMapping("/redo")
    public void redo() {
        shapeService.redo();
    }
    @PostMapping("/load")
    public void loading(@RequestBody List<Shape> shapes) {
        shapeService.loadShapes(shapes);
    }
    @DeleteMapping("/{id}")
    public void deleteShape(@PathVariable int id) {
        shapeService.deleteShape(id);
    }
}
