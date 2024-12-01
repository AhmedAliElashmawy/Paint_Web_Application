package com.example.PaintApplication;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;

public class Circle extends EllipticalShape {
public Circle(){
    super();
}

    public Circle(int id,int x, int y, String color, double radius1,String type,int strokeWidth,String fill) {
        super(x, y, color, radius1, radius1, type,strokeWidth,fill);
    }

    @Override
    public String getType() {
        return "Circle";
    }

    @Override
    public Circle clone() {
        return new Circle(id,x, y, color, radius1, type,strokeWidth,fill);
    }
}
