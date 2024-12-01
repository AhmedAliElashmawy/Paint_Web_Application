package com.example.PaintApplication;

import jakarta.persistence.Column;

public class Circle extends EllipticalShape {
public Circle(){
    super();
}

<<<<<<< Updated upstream
    public Circle(int x, int y, String color, boolean isVisible, double radius1) {
        super(x, y, color, isVisible, radius1, radius1);
    }

    @Override
    public double getArea() {
        return Math.PI * radius1 * radius1;
=======
    public Circle(int id,int x, int y, String color, double radius1,String type,int strokeWidth,String fill) {
        super(x, y, color, radius1, radius1, type,strokeWidth,fill);
>>>>>>> Stashed changes
    }

    @Override
    public String getType() {
        return "Circle";
    }

    @Override
    public Circle clone() {
<<<<<<< Updated upstream
        return new Circle(x, y, color, isVisible, radius1);
=======
        return new Circle(id,x, y, color, radius1, type,strokeWidth,fill);
>>>>>>> Stashed changes
    }
}
