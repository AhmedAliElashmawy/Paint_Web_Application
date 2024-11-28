package com.example.PaintApplication;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class IsoscelesTriangle extends Triangle{
    public IsoscelesTriangle(int x, int y, String color, boolean isVisible, double x1, double y1, double x2, double y2, double x3, double y3) {
        super(x, y, color, isVisible, x1, y1, x2, y2, x3, y3);
        if (!isIsoscelesTriangle(x1, y1, x2, y2, x3, y3)) {
            throw new IllegalArgumentException("The points do not form an isosceles triangle.");
        }
    }

    private boolean isIsoscelesTriangle(double x1, double y1, double x2, double y2, double x3, double y3) {
        double z1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        double z2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
        double z3 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
        return Math.abs(z1 - z2) < 1e-6 || Math.abs(z2 - z3) < 1e-6 || Math.abs(z1 - z3) < 1e-6;
    }

    @Override
    public String getType() {
        return "Isosceles Triangle";
    }
}
