package com.example.PaintApplication;

public class LineSegment extends Shape {
    private String type;
    private String color;
    private int strokeWidth;
    private int x;
    private int y;
    private int x2;
    private int y2;
    public LineSegment(){

    }
    @Override
    public String getType() {
        return "LineSegment";
    }
}

