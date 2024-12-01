package com.example.PaintApplication;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< Updated upstream
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
=======
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {
<<<<<<< Updated upstream
    @Autowired
    private ShapeService shapeService;
=======

    @Autowired
    private ShapeService shapeService;

    // Add a shape
    @PostMapping
    public void addShape(@RequestBody Shape shape) {
        shapeService.addShape(shape);
    }

    // Get all shapes
>>>>>>> Stashed changes
    @GetMapping
    public List<Shape> getAllShapes() {
        return shapeService.getAllShapes();
    }

    // Clear all shapes
    @DeleteMapping
    public void clearShapes() {
        shapeService.clearShapes();
    }

<<<<<<< Updated upstream
    @PostMapping
    public Shape createShape(@RequestBody Shape shape) {
        return shapeService.saveShape(shape);
    }
    @PutMapping("/{id}")
    public Shape updateShape(@PathVariable Long id, @RequestBody Shape shape) {
        return shapeService.updateShape(id, shape);
=======
    // Copy a shape
    @PostMapping("/copy/{id}")
    public void copyShape(@PathVariable int id) {
        shapeService.copyShape(id);
    }
    @PostMapping("/paste")
    public void pasteShape() {
        shapeService.pasteShape();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
}


=======
    @PostMapping("/load")
    public void loading(@RequestBody List<Shape> shapes) {
        shapeService.loadShapes(shapes);
    }
}
>>>>>>> Stashed changes
