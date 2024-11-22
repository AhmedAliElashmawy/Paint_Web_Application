package com.example.PaintApplication;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class LineSegment extends Shape {
    private double length;
    private double angle;
    public LineSegment(){

    }
    @Override
    public String getType() {
        return "LineSegment";
    }
}

