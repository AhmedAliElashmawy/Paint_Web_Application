package com.example.PaintApplication;

import jakarta.persistence.Entity;
import lombok.Data;


public class LineSegment extends Shape {
    private int x2;
    private int y2;
    public LineSegment(){

    }
    @Override
    public String getType() {
        return "LineSegment";
    }
}

