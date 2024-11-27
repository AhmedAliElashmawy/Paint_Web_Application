package com.example.PaintApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {

    private final ShapeService shapeService;
    private final SketchManager sketchManager;

    @Autowired
    public ShapeController(ShapeService shapeService, SketchManager sketchManager) {
        this.shapeService = shapeService;
        this.sketchManager = sketchManager;
    }

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

    @PostMapping("/save")
    public String saveShapes() {
        try {
            sketchManager.saveSketchAsJSON();
            sketchManager.saveSketchAsXML();
            return "Shapes saved successfully in both JSON and XML formats.";
        } catch (IOException e) {
            return "Error saving shapes: " + e.getMessage();
        }
    }

    @PostMapping("/load")
    public String loadShapes(@RequestParam String format) {
        try {
            if ("json".equalsIgnoreCase(format)) {
                sketchManager.loadSketchFromJSON();
                return "Shapes loaded successfully from JSON.";
            } else if ("xml".equalsIgnoreCase(format)) {
                sketchManager.loadSketchFromXML();
                return "Shapes loaded successfully from XML.";
            } else {
                return "Invalid format. Please specify 'json' or 'xml'.";
            }
        } catch (IOException e) {
            return "Error loading shapes: " + e.getMessage();
        }
    }
}
