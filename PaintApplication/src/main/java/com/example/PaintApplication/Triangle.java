package com.example.PaintApplication;


public class Triangle extends Polygon {
    private int x1;
    private int x2;
    private int x3;
public Triangle(){
    super();
}
    // Constructor for Triangle
    public Triangle(int x, int y, String color, boolean isVisible, int x1, int x2, int x3) {
        super(x, y, color, isVisible, 3); // Triangle has 3 sides
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;

    }

    @Override
    public double getPerimeter() {
        return x1+x2+x3;
    }

    @Override
    public String getType() {
        return "Triangle";
    }
    public Triangle clone() {
        return new Triangle(x, y, color, isVisible, x1,x2,x3);
    }
}
