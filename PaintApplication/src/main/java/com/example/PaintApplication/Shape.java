package com.example.PaintApplication;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,  // Include type info in JSON as a property
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"           // The field name for type information
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Circle.class, name = "Circle"),
        @JsonSubTypes.Type(value = Rectangle.class, name = "Rectangle"),
        @JsonSubTypes.Type(value = Square.class, name = "Square"),
        @JsonSubTypes.Type(value = Ellipse.class, name = "Ellipse"),
        @JsonSubTypes.Type(value = LineSegment.class, name = "LineSegment"),
        @JsonSubTypes.Type(value = IsoscelesTriangle.class, name = "IsoscelesTriangle"),
        @JsonSubTypes.Type(value = EquilateralTriangle.class, name = "EquilateralTriangle"),
        @JsonSubTypes.Type(value = RightTriangle.class, name = "RightTriangle"),
})


public abstract class Shape implements Cloneable {
    int id;
    int x;
    int y;
    String color;
    String type;
    long width;
    long height;
    int strokeWidth;
    String fill;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getWidth() {
        return width;
    }

    public void setWidth(long width) {
        this.width = width;
    }

    public long getHeight() {
        return height;
    }

    public void setHeight(long height) {
        this.height = height;
    }

    public int getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(int strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    public String getFill() {
        return fill;
    }

    public void setFill(String fill) {
        this.fill = fill;
    }

    public static List<Shape> getShapeList() {
        return shapeList;
    }

    public static void setShapeList(List<Shape> shapeList) {
        Shape.shapeList = shapeList;
    }



    // Static list to store shapes
    private static List<Shape> shapeList = new ArrayList<>();

    // Methods to manage the array of shapes
    public static void addShape(Shape shape) {
        shapeList.add(shape);

    }

    public static List<Shape> getShapes() {
        return shapeList;
    }

    public static void clearShapes() {
        shapeList.clear();

    }

    public abstract String getType();
    public static void setShapes(List<Shape> shapes) {
        shapeList = shapes;
    }
    @Override
    public Shape clone() {

        try {
            return (Shape) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Cloning failed for shape: " + getType());
        }

    }
}
