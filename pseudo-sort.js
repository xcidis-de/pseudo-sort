function psuedoLinearSort(array) {
    let sorted = [];
    let reduced = [];
    let var_hold, variance;
    let largest = array[0];
    let smallest = array[0];
    let diff;

    for (let i = 0; i < array.length; i++) {
        largest = array[i] > largest ? array[i] : largest;
        smallest = array[i] < smallest ? array[i] : smallest
    }
    variance = Math.ceil(largest - smallest) < array.length ? Math.ceil(largest - smallest) : array.length;
    var_hold = variance;

    while (variance > 100000) {
        reduced = reduced.concat(Array.apply(null, Array(100000)).map((el) => { return Array(0) }))
        variance -= 100000
    }
    reduced = reduced.concat(Array.apply(null, Array(variance)).map((el) => { return Array(0) }))


    diff = largest - smallest;

    for (i = 0; i < array.length; i++) {
        index = Math.floor((array[i] - smallest) / diff * (var_hold - 1));
        reduced[index].push(array[i]);
    }
    for (let x = 0; x < reduced.length; x++) {
        sorted.push(...reduced[x].sort((a, b) => { return a - b }));
    }
    return sorted;
}
function quicksort(array) {
    let median,
        lessThan = [],
        greaterThan = [],
        sorted = true,
        tmp;

    if (array.length <= 1) {
        return array;
    }

    if (array.length >= 3) {
        median = bestOfThree(array);
    } else {
        median = 0;
    }


    for (let i = 0; i < array.length; i++) {
        if (!tmp) {
            tmp = array[i]
        } else if (tmp > array[i]) {
            sorted = false;
        }

        if (i !== median && array[i] >= array[median]) {
            greaterThan.push(array[i]);
        } else if (i !== median) {
            lessThan.push(array[i]);
        }
        tmp = array[i];
    }
    if (sorted) {
        return array;
    } else {
        return [
            ...quicksort(lessThan),
            array[median],
            ...quicksort(greaterThan)
        ]
    }
}

function bestOfThree(array) {
    //only if array is > 3 in length
    let end = array.length - 1;
    let median = Math.floor(array.length / 2);
    if (array[0] > array[median] && array[0] > array[end]) {
        if (array[median] > array[end]) {
            return median;
        } else {
            return end;
        }
    } else if (array[median] > array[0] && array[median] > array[end]) {
        if (array[0] > array[end]) {
            return 0;
        } else {
            return end;
        }
    } else {
        if (array[0] > array[median]) {
            return 0;
        } else {
            return median;
        }
    }
}
function countingSort(arr, min, max) {
    var i, z = 0, count = [];

    for (i = min; i <= max; i++) {
        count[i] = 0;
    }

    for (i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    for (i = min; i <= max; i++) {
        while (count[i]-- > 0) {
            arr[z++] = i;
        }
    }
    return arr;
}
let randos = [];
let worst_case = [10000000, 1, 3, 9, 10, 11, 12];
let num;
let variance = 100000;

for (let x = 0; x < 10000000; x++) {
    num = Math.random() * variance;
    randos.push(num);
}

let timer = Date.now();
let array_one = quicksort(randos);
console.log('quick', Date.now() - timer);

// timer = Date.now();
// let count_large = countingSort(randos, 0, variance);
// console.log('count', Date.now() - timer, count_large);

timer = Date.now();
let array_three = psuedoLinearSort(randos, variance);
console.log('linear', Date.now() - timer)

timer = Date.now();
let array_two = randos.sort((a, b) => { return a - b });
console.log('baked in', Date.now() - timer);

timer = Date.now();
let worst = psuedoLinearSort(worst_case, worst_case.length);
console.log('worst_case', Date.now() - timer, worst);

timer = Date.now();
let count = countingSort(worst_case, 1, 10000000);
console.log('count', Date.now() - timer, count);

timer = Date.now();
let ideal = worst_case.sort((a, b) => { return a - b });
console.log('baked in for psuedos worst_case', Date.now() - timer, ideal);

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) {
        console.log(null);
        return false;
    }
    if (a.length != b.length) {
        console.log('here');
        return false;
    }
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            console.log('abi', a[i], b[i], i)
            return false;
        }
    }
    return true;
}

console.log(arraysEqual(worst, ideal));
console.log(arraysEqual(array_two, array_three));