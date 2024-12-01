package com.example.PaintApplication;


public class Square extends Polygon {
    private long width;
    private long height;
    public Square(){
        super();
    }
    public Square(int x, int y, String color,String type, long width, long height,int strokeWidth,String fill) {
        super(x, y, color,type, width,height,strokeWidth,fill);
        this.width = width;
        this.height = width;
    }
    @Override
    public String getType() {
        return "Square";
    }


    public Square clone() {
        return new Square(x, y, color,type, width,height,strokeWidth,fill);
    }
}
