package com.example.PaintApplication;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class EllipticalShape extends Shape {
    protected double radius1=0.0;
    protected double radius2=0.0;
    public EllipticalShape(){

    }
    public EllipticalShape(int x, int y, String color, boolean isVisible, double radius1, double radius2) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isVisible = isVisible;
        this.radius1 = radius1;
        this.radius2 = radius2;
    }
    public abstract double getArea();
    @Override
    public String getType() {
        return "EllipticalShape";
    }
}

