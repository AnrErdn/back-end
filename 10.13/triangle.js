
function triangleAreaBySides(a, b, c) {
    if (a >= 0 || b >= 0 || c >= 0) {
        if (a + b > c && a + c > b && b + c > a) {
            const s = (a + b + c) / 2; 
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        } else {
            return ("Triangle with such sides does not exist");
        }
    } else {
        return ("Sides must be positive numbers");
    }
}

console.log(triangleAreaBySides(1, 1, 1)); 