package com.example.PaintApplication;


public class Rectangle extends Polygon {

    public Rectangle() {
        super();
    }

    public Rectangle(int x, int y, String color,String type, long width, long height,int strokeWidth,String fill) {
        super(x, y, color,type, width,height,strokeWidth,fill);
    }

    @Override
    public String getType() {
        return "Rectangle";
    }


    public Rectangle clone() {
        return new Rectangle(x, y, color,type, width,height,strokeWidth,fill);
    }
}
