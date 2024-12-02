package com.example.PaintApplication;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

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
        @JsonSubTypes.Type(value = Brush.class, name = "Brush"),
        @JsonSubTypes.Type(value = Pencil.class, name = "Pencil"),
        @JsonSubTypes.Type(value = AirBrush.class, name = "AirBrush"),
})


public abstract class Shape implements Cloneable {
    String id;
    int x;
    int y;
    String color;
    String type;
    long width;
    long height;
    int strokeWidth;
    String fill;
    double radius1;
    double radius2;
    int x1;
    int y1;
    int x2;
    int y2;
    int x3;
    int y3;
    double opacity;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public double getRadius1() {
        return radius1;
    }

    public void setRadius1(double radius1) {
        this.radius1 = radius1;
    }

    public double getRadius2() {
        return radius2;
    }

    public void setRadius2(double radius2) {
        this.radius2 = radius2;
    }

    public int getx1() {
        return x1;
    }

    public void setx1(int x1) {
        this.x1 = x1;
    }
    public int getx2() {
        return x2;
    }

    public void setx2(int x2) {
        this.x2 = x2;
    }
    public int getx3() {
        return x3;
    }

    public void setx3(int x3) {
        this.x3 = x3;
    }

    public int gety1() {
        return y1;
    }

    public void sety1(int y1) {
        this.y1 = y1;
    }
    public int gety2() {
        return y2;
    }

    public void sety2(int y2) {
        this.y2 = y2;
    }
    public int gety3() {
        return y3;
    }

    public void sety3(int y3) {
        this.y3 = y3;
    }
    public double getOpacity() {
        return opacity;
    }

    public void setOpacity(double opacity) {
        this.opacity = opacity;
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
    public static void UndoShape() {
        shapeList.removeLast();
    }

    public static void delete(Shape shape){
        System.out.println(shapeList.remove(shape));
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
