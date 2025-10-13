const point1 = {x: 2, y: 3};
const point2 = {x: 3, y: 4};
const point3 = {x: 4, y: 5};

export default function threedot(p1, p2, p3) {
    const length1 = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    const length2 = Math.sqrt((p3.x - p2.x) ** 2 + (p3.y - p2.y) ** 2);
    const length3 = Math.sqrt((p1.x - p3.x) ** 2 + (p1.y - p3.y) ** 2);

    if (length1 + length2 > length3 && length1 + length3 > length2 && length2 + length3 > length1) {
        const s = (length1 + length2 + length3) / 2;
        const Area = Math.sqrt(s * (s - length1) * (s - length2) * (s - length3));
        const Perimeter = length1 + length2 + length3;
        return { Area, Perimeter };
    } else {
        return { Area: null, Perimeter: null, error: "Triangle with such sides does not exist" };
    }
}

const result = threedot(point1, point2, point3);
console.log("Area:", result.Area);
console.log("Perimeter:", result.Perimeter);
if (result.error) {
    console.log("Error", result.error);
}