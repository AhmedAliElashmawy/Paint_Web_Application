package com.example.PaintApplication;


import java.util.List;


public class Pencil extends Shape{
    private String id;

    private String type;
    private List<Integer> points;
    private String color;
    private int strokeWidth;

    public Pencil(){
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return "Pencil";
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Integer> getPoints() {
        return points;
    }

    public void setPoints(List<Integer> points) {
        this.points = points;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(int strokeWidth) {
        this.strokeWidth = strokeWidth;
    }
    public Shape clone() {
        return (Shape) super.clone();
    }
    // Getters and setters
}
