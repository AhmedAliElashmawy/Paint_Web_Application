package com.example.PaintApplication;


public class Square extends Polygon {
<<<<<<< Updated upstream
    private double width;
    private double height;
=======
    private long width;
    private long height;
>>>>>>> Stashed changes
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
