package com.example.PaintApplication;

import jakarta.persistence.Entity;
import lombok.Data;


public class LineSegment extends Shape {
<<<<<<< Updated upstream
    private double length;
    private double angle;
=======
    private int x2;
    private int y2;
>>>>>>> Stashed changes
    public LineSegment(){

    }
    @Override
    public String getType() {
        return "LineSegment";
    }
}

