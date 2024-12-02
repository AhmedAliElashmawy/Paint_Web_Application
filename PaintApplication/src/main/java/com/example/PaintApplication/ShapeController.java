package com.example.PaintApplication;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    @PostMapping("/deletes")
    public ResponseEntity<String> clearShapes() {
    try {
        System.out.println("hi");
        shapeService.clearShapes();
        return ResponseEntity.ok("Shapes cleared");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to clear shapes");
    }
}

    @PostMapping("/delete")
    public void clearShape(@RequestBody Shape shape) {
    shapeService.deleteShape(shape);
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