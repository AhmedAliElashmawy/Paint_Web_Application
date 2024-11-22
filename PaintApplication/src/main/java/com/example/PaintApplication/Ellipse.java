package com.example.PaintApplication;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Ellipse extends EllipticalShape{
public Ellipse(){
    super();
}
    public Ellipse(int x, int y, String color, boolean isVisible, double radius1,double radius2) {
        super(x, y, color, isVisible, radius1, radius2);
    }

    @Override
    public double getArea() {
        return Math.PI * radius1 * radius2;
    }
    @Override
    public String getType(){
        return "Ellipse";
    }
    public Ellipse clone() {
        return new Ellipse(x, y, color, isVisible, radius1,radius2);
    }
}
