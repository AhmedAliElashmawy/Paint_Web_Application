package com.example.PaintApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {
    @Autowired
    private ShapeService shapeService;
    @GetMapping
    public List<Shape> getAllShapes() {
        return shapeService.getAllShapes();
    }

    @GetMapping("/{id}")
    public Shape getShapeById(@PathVariable Long id) {
        return shapeService.getShapeById(id);
    }

    @PostMapping
    public Shape createShape(@RequestBody Shape shape) {
        return shapeService.saveShape(shape);
    }
    @PutMapping("/{id}")
    public Shape updateShape(@PathVariable Long id, @RequestBody Shape shape) {
        return shapeService.updateShape(id, shape);
    }

    @DeleteMapping("/{id}")
    public void deleteShape(@PathVariable Long id) {
        shapeService.deleteShape(id);
    }

    @PostMapping("/{id}/resize")
    public Shape resizeShape(@PathVariable Long id, @RequestParam double factor) {
        return shapeService.resizeShape(id, factor);
    }

    @PostMapping("/{id}/copy")
    public Shape copyShape(@PathVariable Long id) {
        return shapeService.copyShape(id);
    }

    @PostMapping("/undo")
    public void undo() {
        shapeService.undo();
    }

    @PostMapping("/redo")
    public void redo() {
        shapeService.redo();
    }
}


