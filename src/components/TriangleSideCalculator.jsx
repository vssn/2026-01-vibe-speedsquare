import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function TriangleSideCalculator() {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [angle, setAngle] = useState("");

  const calculateThirdSide = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const angleC = parseFloat(angle);
    
    if (isNaN(a) || isNaN(b) || isNaN(angleC) || a <= 0 || b <= 0 || angleC <= 0 || angleC >= 180) {
      return "";
    }
    
    // Law of cosines: c² = a² + b² - 2ab*cos(C)
    const angleRad = (angleC * Math.PI) / 180;
    const cSquared = a * a + b * b - 2 * a * b * Math.cos(angleRad);
    const c = Math.sqrt(cSquared);
    
    return c.toFixed(2);
  };

  const thirdSide = calculateThirdSide();

  // Calculate dynamic triangle dimensions for SVG
  const getTrianglePoints = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const angleC = parseFloat(angle);
    
    if (isNaN(a) || isNaN(b) || isNaN(angleC) || a <= 0 || b <= 0 || angleC <= 0 || angleC >= 180) {
      return null;
    }
    
    // Scale to fit in SVG viewBox (300x280 with padding)
    const maxDimension = Math.max(a, b);
    const scale = 180 / maxDimension;
    
    const scaledA = a * scale;
    const scaledB = b * scale;
    
    // Position triangle in viewBox
    // Point 1 (bottom left corner) - where angle C is
    const padding = 50;
    const x1 = padding;
    const y1 = 240 - padding;
    
    // Point 2 (bottom right) - along side B
    const x2 = x1 + scaledB;
    const y2 = y1;
    
    // Point 3 - calculated using angle C and side A
    const angleRad = (angleC * Math.PI) / 180;
    const x3 = x1 + scaledA * Math.cos(angleRad);
    const y3 = y1 - scaledA * Math.sin(angleRad);
    
    return { x1, y1, x2, y2, x3, y3, angleC, scaledA, scaledB };
  };

  const trianglePoints = getTrianglePoints();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Triangle Side Calculator</CardTitle>
        <CardDescription>Calculate the third side using two sides and the angle between them</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sideA2">Side A (mm)</Label>
          <Input
            id="sideA2"
            type="number"
            placeholder="Enter length in mm"
            value={sideA}
            onChange={(e) => setSideA(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sideB2">Side B (mm)</Label>
          <Input
            id="sideB2"
            type="number"
            placeholder="Enter length in mm"
            value={sideB}
            onChange={(e) => setSideB(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="angle">Angle between sides (degrees)</Label>
          <Input
            id="angle"
            type="number"
            placeholder="Enter angle in degrees"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
          />
        </div>
        {thirdSide && (
          <div className="pt-4 border-t space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Third Side (c)</p>
              <p className="text-2xl font-bold">{thirdSide} mm</p>
            </div>
            
            <div className="flex justify-center">
              <svg width="300" height="280" viewBox="0 0 300 280" className="border rounded-lg bg-slate-50">
                {trianglePoints && (
                  <>
                    {/* Triangle */}
                    <polygon 
                      points={`${trianglePoints.x1},${trianglePoints.y1} ${trianglePoints.x2},${trianglePoints.y2} ${trianglePoints.x3},${trianglePoints.y3}`}
                      fill="none" 
                      stroke="#1e293b" 
                      strokeWidth="2"
                    />
                    
                    {/* Angle arc */}
                    <path 
                      d={`M ${trianglePoints.x1 + 30},${trianglePoints.y1} A 30 30 0 0 0 ${trianglePoints.x1 + 30 * Math.cos(trianglePoints.angleC * Math.PI / 180)},${trianglePoints.y1 - 30 * Math.sin(trianglePoints.angleC * Math.PI / 180)}`}
                      fill="none" 
                      stroke="#9333ea" 
                      strokeWidth="1.5"
                    />
                    <text 
                      x={trianglePoints.x1 + 45 * Math.cos((trianglePoints.angleC / 2) * Math.PI / 180)} 
                      y={trianglePoints.y1 - 45 * Math.sin((trianglePoints.angleC / 2) * Math.PI / 180) + 5} 
                      fill="#9333ea" 
                      fontSize="14" 
                      fontWeight="bold"
                    >
                      {angle}°
                    </text>
                    
                    {/* Side A */}
                    <text 
                      x={(trianglePoints.x1 + trianglePoints.x3) / 2 - 20 * Math.sin(trianglePoints.angleC * Math.PI / 180)} 
                      y={(trianglePoints.y1 + trianglePoints.y3) / 2 + 20 * Math.cos(trianglePoints.angleC * Math.PI / 180)} 
                      textAnchor="middle" 
                      fill="#3b82f6" 
                      fontSize="14" 
                      fontWeight="bold" 
                      transform={`rotate(${-trianglePoints.angleC} ${(trianglePoints.x1 + trianglePoints.x3) / 2 - 20 * Math.sin(trianglePoints.angleC * Math.PI / 180)} ${(trianglePoints.y1 + trianglePoints.y3) / 2 + 20 * Math.cos(trianglePoints.angleC * Math.PI / 180)})`}
                    >
                      a = {sideA} mm
                    </text>
                    
                    {/* Side B (bottom) */}
                    <line 
                      x1={trianglePoints.x1} 
                      y1={trianglePoints.y1 + 5} 
                      x2={trianglePoints.x2} 
                      y2={trianglePoints.y2 + 5} 
                      stroke="#10b981" 
                      strokeWidth="2" 
                    />
                    <text 
                      x={(trianglePoints.x1 + trianglePoints.x2) / 2} 
                      y={trianglePoints.y1 + 25} 
                      textAnchor="middle" 
                      fill="#10b981" 
                      fontSize="14" 
                      fontWeight="bold"
                    >
                      b = {sideB} mm
                    </text>
                    
                    {/* Side C (calculated side) */}
                    <text 
                      x={(trianglePoints.x2 + trianglePoints.x3) / 2 + 15} 
                      y={(trianglePoints.y2 + trianglePoints.y3) / 2} 
                      textAnchor="middle" 
                      fill="#ef4444" 
                      fontSize="14" 
                      fontWeight="bold" 
                      transform={`rotate(${-Math.atan2(trianglePoints.y2 - trianglePoints.y3, trianglePoints.x2 - trianglePoints.x3) * 180 / Math.PI} ${(trianglePoints.x2 + trianglePoints.x3) / 2 + 15} ${(trianglePoints.y2 + trianglePoints.y3) / 2})`}
                    >
                      c = {thirdSide} mm
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
