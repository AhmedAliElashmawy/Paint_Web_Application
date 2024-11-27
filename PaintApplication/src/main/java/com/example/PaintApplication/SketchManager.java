package com.example.PaintApplication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import javax.swing.*;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class SketchManager {
    private final ShapeService shapeService;

    public SketchManager(ShapeService shapeService) {
        this.shapeService = shapeService;
    }

    // Save sketch to XML
    public void saveSketchAsXML() throws IOException {
        List<Shape> shapes = shapeService.getAllShapes();
        Sketch sketch = new Sketch(shapes);

        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setDialogTitle("Save Sketch as XML");
        if (fileChooser.showSaveDialog(null) == JFileChooser.APPROVE_OPTION) {
            File file = fileChooser.getSelectedFile();
            XmlMapper xmlMapper = new XmlMapper();
            xmlMapper.writeValue(file, sketch);
        }
    }

    // Save sketch to JSON
    public void saveSketchAsJSON() throws IOException {
        List<Shape> shapes = shapeService.getAllShapes();
        Sketch sketch = new Sketch(shapes);

        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setDialogTitle("Save Sketch as JSON");
        if (fileChooser.showSaveDialog(null) == JFileChooser.APPROVE_OPTION) {
            File file = fileChooser.getSelectedFile();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(file, sketch);
        }
    }

    // Load sketch from XML
    public void loadSketchFromXML() throws IOException {
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setDialogTitle("Load Sketch from XML");
        if (fileChooser.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
            File file = fileChooser.getSelectedFile();
            XmlMapper xmlMapper = new XmlMapper();
            Sketch sketch = xmlMapper.readValue(file, Sketch.class);
            shapeService.loadShapes(sketch.getShapes());
        }
    }

    // Load sketch from JSON
    public void loadSketchFromJSON() throws IOException {
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setDialogTitle("Load Sketch from JSON");
        if (fileChooser.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
            File file = fileChooser.getSelectedFile();
            ObjectMapper objectMapper = new ObjectMapper();
            Sketch sketch = objectMapper.readValue(file, Sketch.class);
            shapeService.loadShapes(sketch.getShapes());
        }
    }
}
