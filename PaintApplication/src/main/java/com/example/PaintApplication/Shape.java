package com.example.PaintApplication;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Data;
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
        @JsonSubTypes.Type(value = Triangle.class, name = "Triangle")
})

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Shape implements Cloneable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    int x;
    int y;
    String color;
    boolean isVisible;
    public abstract String getType();
    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Cloning failed for shape: " + getType());
        }
    }
}
