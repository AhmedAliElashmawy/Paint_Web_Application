package com.example.PaintApplication;

<<<<<<< Updated upstream
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Rectangle extends Polygon{
    private double width;
    private double height;
    public Rectangle(){
=======

public class Rectangle extends Polygon {

    public Rectangle() {
>>>>>>> Stashed changes
        super();
    }
    public Rectangle(int x, int y, String color, boolean isVisible, double width, double height) {
        super(x, y, color, isVisible, 4); // Rectangle has 4 sides
        this.width = width;
        this.height = height;
    }

    @Override
    public String getType() {
        return "Rectangle";
    }

    @Override
    public double getPerimeter() {
        return 2 * (width + height);
    }
    public Rectangle clone() {
        return new Rectangle(x, y, color, isVisible, width,height);
    }
}
