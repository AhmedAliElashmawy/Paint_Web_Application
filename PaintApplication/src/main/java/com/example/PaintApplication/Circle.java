package com.example.PaintApplication;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Circle extends EllipticalShape {
public Circle(){
    super();
}

    public Circle(int x, int y, String color, double radius1,String type,int strokeWidth,String fill) {
        super(x, y, color, radius1, radius1, type,strokeWidth,fill);
    }

    @Override
    public String getType() {
        return "Circle";
    }

    @Override
    public Circle clone() {
        return new Circle(x, y, color, radius1, type,strokeWidth,fill);
    }
}
