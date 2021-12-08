var add = function (x, y) { return x + y; };
var equals = function (x, y) { return x === y; };
console.log(add(1, 2));
console.log(add(true, true));
console.log(add(true, false));
var x = y = 1;
console.log(add(equals(x, y), equals(y, x)));
//# sourceMappingURL=02_typescript.js.map