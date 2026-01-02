import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function RightAngleCalculator() {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");

  const calculateHypotenuse = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      return "";
    }
    
    const hypotenuse = Math.sqrt(a * a + b * b);
    return hypotenuse.toFixed(2);
  };

  const hypotenuse = calculateHypotenuse();

  // Calculate dynamic triangle dimensions for SVG
  const getTrianglePoints = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      return null;
    }
    
    // Scale to fit in SVG viewBox (300x250 with padding)
    const maxDimension = Math.max(a, b);
    const scale = 180 / maxDimension;
    
    const scaledA = a * scale;
    const scaledB = b * scale;
    
    // Position triangle in viewBox
    const padding = 50;
    const x1 = padding;
    const y1 = 220 - padding;
    const x2 = x1 + scaledA;
    const y2 = y1;
    const x3 = x1;
    const y3 = y1 - scaledB;
    
    return { x1, y1, x2, y2, x3, y3, scaledA, scaledB };
  };

  const trianglePoints = getTrianglePoints();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Right-Angle Triangle Calculator</CardTitle>
        <CardDescription>Calculate the hypothenuse from two sides</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sideA">Side A (mm)</Label>
          <Input
            id="sideA"
            type="number"
            placeholder="Enter length in mm"
            value={sideA}
            onChange={(e) => setSideA(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sideB">Side B (mm)</Label>
          <Input
            id="sideB"
            type="number"
            placeholder="Enter length in mm"
            value={sideB}
            onChange={(e) => setSideB(e.target.value)}
          />
        </div>
        {hypotenuse && (
          <div className="pt-4 border-t space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Hypothenuse</p>
              <p className="text-2xl font-bold">{hypotenuse} mm</p>
            </div>
            
            <div className="flex justify-center">
              <svg width="300" height="250" viewBox="0 0 300 250" className="border rounded-lg bg-slate-50">
                {trianglePoints && (
                  <>
                    {/* Right-angle triangle */}
                    <polygon 
                      points={`${trianglePoints.x1},${trianglePoints.y1} ${trianglePoints.x2},${trianglePoints.y2} ${trianglePoints.x3},${trianglePoints.y3}`}
                      fill="none" 
                      stroke="#1e293b" 
                      strokeWidth="2"
                    />
                    
                    {/* Right angle marker */}
                    <path 
                      d={`M ${trianglePoints.x1},${trianglePoints.y1 - 20} L ${trianglePoints.x1 + 20},${trianglePoints.y1 - 20} L ${trianglePoints.x1 + 20},${trianglePoints.y1}`}
                      fill="none" 
                      stroke="#1e293b" 
                      strokeWidth="1.5"
                    />
                    
                    {/* Side A (bottom) */}
                    <line 
                      x1={trianglePoints.x1} 
                      y1={trianglePoints.y1 + 5} 
                      x2={trianglePoints.x2} 
                      y2={trianglePoints.y2 + 5} 
                      stroke="#3b82f6" 
                      strokeWidth="2" 
                    />
                    <text 
                      x={(trianglePoints.x1 + trianglePoints.x2) / 2} 
                      y={trianglePoints.y1 + 25} 
                      textAnchor="middle" 
                      fill="#3b82f6" 
                      fontSize="14" 
                      fontWeight="bold"
                    >
                      a = {sideA} mm
                    </text>
                    
                    {/* Side B (left) */}
                    <line 
                      x1={trianglePoints.x1 - 5} 
                      y1={trianglePoints.y3} 
                      x2={trianglePoints.x1 - 5} 
                      y2={trianglePoints.y1} 
                      stroke="#10b981" 
                      strokeWidth="2" 
                    />
                    <text 
                      x={trianglePoints.x1 - 25} 
                      y={(trianglePoints.y1 + trianglePoints.y3) / 2} 
                      textAnchor="middle" 
                      fill="#10b981" 
                      fontSize="14" 
                      fontWeight="bold" 
                      transform={`rotate(-90 ${trianglePoints.x1 - 25} ${(trianglePoints.y1 + trianglePoints.y3) / 2})`}
                    >
                      b = {sideB} mm
                    </text>
                    
                    {/* Hypotenuse */}
                    <text 
                      x={(trianglePoints.x2 + trianglePoints.x3) / 2 + 15} 
                      y={(trianglePoints.y2 + trianglePoints.y3) / 2} 
                      textAnchor="middle" 
                      fill="#ef4444" 
                      fontSize="14" 
                      fontWeight="bold" 
                      transform={`rotate(${-Math.atan2(trianglePoints.scaledB, trianglePoints.scaledA) * 180 / Math.PI} ${(trianglePoints.x2 + trianglePoints.x3) / 2 + 15} ${(trianglePoints.y2 + trianglePoints.y3) / 2})`}
                    >
                      c = {hypotenuse} mm
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
