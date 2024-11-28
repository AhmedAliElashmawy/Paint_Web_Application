package com.example.PaintApplication;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class Polygon extends Shape {
    @Version
    private int version;
    protected int sides;
    public Polygon(){

    }
    public Polygon(int x, int y, String color, boolean isVisible, int sides) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isVisible = isVisible;
        this.sides = sides;
    }
    public abstract double getPerimeter();
    @Override
    public String getType() {
        return "Polygon";
    }
}

