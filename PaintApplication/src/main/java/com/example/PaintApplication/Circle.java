package com.example.PaintApplication;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Circle extends EllipticalShape {
public Circle(){
    super();
}

    public Circle(int x, int y, String color, boolean isVisible, double radius1) {
        super(x, y, color, isVisible, radius1, radius1);
    }

    @Override
    public double getArea() {
        return Math.PI * radius1 * radius1;
    }

    @Override
    public String getType() {
        return "Circle";
    }

    @Override
    public Circle clone() {
        return new Circle(x, y, color, isVisible, radius1);
    }
}
