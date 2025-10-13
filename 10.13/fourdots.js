const point1 = { x: 0, y: 0 };
const point2 = { x: 4, y: 0 };
const point3 = { x: 0, y: 3 };
const point4 = { x: 4, y: 3 };

function distance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function dotProduct(p1, p2, p3) {
  const v1x = p2.x - p1.x;
  const v1y = p2.y - p1.y;
  const v2x = p3.x - p2.x;
  const v2y = p3.y - p2.y;
  return v1x * v2x + v1y * v2y;
}

export default function fourdots(p1, p2, p3, p4) {
  const length1 = distance(p1, p2);
  const length2 = distance(p2, p3);
  const length3 = distance(p3, p4);
  const length4 = distance(p4, p1);

  if (
    length1 === length3 &&
    length2 === length4 &&
    dotProduct(p1, p2, p3) === 0
  ) {
    const Area = length1 * length2;
    const Perimeter = 2 * (length1 + length2);
    return { Area, Perimeter };
  } else {
    return { Area: null, Perimeter: null, error: "Rectangle with such sides does not exist" };
  }
}

const result = fourdots(point1, point2, point3, point4);
console.log("Area:", result.Area);
console.log("Perimeter:", result.Perimeter);
if (result.error) {
  console.log("Error:", result.error);
}
