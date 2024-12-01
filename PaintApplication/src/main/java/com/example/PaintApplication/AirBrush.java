package com.example.PaintApplication;


public class AirBrush extends EllipticalShape{
    private int Obacity;
    public AirBrush(){
        super();
    }

    public AirBrush(int x, int y, String color, double radius1,String type,int strokeWidth,String fill,int Obacity) {
        super(x, y, color, radius1, radius1, type,strokeWidth,fill);
    }

    @Override
    public String getType() {
        return "AirBrush";
    }

    @Override
    public AirBrush clone() {
        return new AirBrush(x, y, color, radius1, type,strokeWidth,fill,Obacity);
    }
}
