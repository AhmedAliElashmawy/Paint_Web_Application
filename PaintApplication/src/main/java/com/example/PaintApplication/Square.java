package com.example.PaintApplication;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Square extends Polygon {
    private double width;
    private double height;
    public Square(){
        super();
    }
    public Square(int x, int y, String color, boolean isVisible, double width) {
        super(x, y, color, isVisible, 4); // Rectangle has 4 sides
        this.width = width;
        this.height =width;
    }
    @Override
    public String getType() {
        return "Square";
    }

    @Override
    public double getPerimeter() {
        return 2 * (width + width);
    }
    public Square clone() {
        return new Square(x, y, color, isVisible, width);
    }
}
