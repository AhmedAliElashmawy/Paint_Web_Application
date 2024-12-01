package com.example.PaintApplication;

<<<<<<< Updated upstream
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
=======
>>>>>>> Stashed changes

public abstract class Polygon extends Shape {
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

