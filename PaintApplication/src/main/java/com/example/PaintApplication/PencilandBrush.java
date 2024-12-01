package com.example.PaintApplication;

import jakarta.persistence.*;

import java.util.List;


public class PencilandBrush extends Shape{
    private String Type;
    private List<Double> points;
    public PencilandBrush(){

    }
    public PencilandBrush(int x, int y, String color, String type,int strokeWidth,String fill,String Type ,List<Double>points) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type;
        this.strokeWidth = strokeWidth;
        this.points=points;
        this.Type=Type;
        this.fill = fill;
    }
    @Override
    public String getType() {
        return Type;
    }


    // Getters and setters
}
