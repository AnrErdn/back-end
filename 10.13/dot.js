const point1 = {x: 2, y: 4};
const point2 = {x: 2, y: 8};

export default function dot(point1, point2) {
    let slope;
    
    if (point1.x === point2.x) {
        slope = "The line is vertical";
    } else {
        slope = (point2.y - point1.y) / (point2.x - point1.x);
    }
    
    const length = Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
    
    return { slope, length };
}

const { slope, length } = dot(point1, point2);
console.log(slope);
console.log(length); 