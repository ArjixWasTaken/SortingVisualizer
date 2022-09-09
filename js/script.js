const globals = ["algorithms", "submitAlgorithmBtn", "size", "newArrayBtn", "bar", "arrayValue", "speed"]
    .map((i) => [i, document.getElementById(i)])
    .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

//popup
document.querySelector("#popup").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});

//change array size using range
globals.size.addEventListener("input", function (e) {
    globals.arrayValue.innerHTML = e.target.value;
    deleteChild();
    generateArrayWithSize(parseInt(e.target.value));
});

//creating array with bars
function generateArrayWithSize(size) {
    const bar = globals.bar;

    for (let i = 0; i < size; i++) {
        const num = Math.floor(Math.random() * 300 + 1);
        const barLine = document.createElement("div");

        barLine.style.height = num * 1.3 + "px";
        barLine.classList.add("bar");

        bar.appendChild(barLine);
    }
}

//deleting bars
function deleteChild() {
    globals.bar.innerHTML = "";
}

//new array
const newArray = globals.newArrayBtn;
newArray.addEventListener("click", function () {
    deleteChild();
    generateArrayWithSize(globals.size.value);
});

generateArrayWithSize(globals.size.value);

// disabling and enabling function
function disable() {
    globals.algorithms.disabled = true;
    globals.submitAlgorithmBtn.disabled = true;
    globals.size.disabled = true;
    globals.newArrayBtn.disabled = true;
}

function enable() {
    globals.algorithms.disabled = false;
    globals.submitAlgorithmBtn.disabled = false;
    globals.size.disabled = false;
    globals.newArrayBtn.disabled = false;
}

//setting speed from range
var delay = 45;
globals.speed.addEventListener("input", function (e) {
    delay = 75 - parseInt(e.target.value); //subtracting to maintain speed range well feasible...
    //console.log(delay)
});

const getVal = (node) => parseFloat(node.style.height);
const changeColor = (node, color) => {
    node.style.background = color;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function BubbleSort() {
    var stuff = globals.bar.children;
    for (let i = 0; i < stuff.length - 1; i++) {
        for (let j = 0; j < stuff.length - i - 1; j++) {
            stuff[j].style.background = "rgb(5, 62, 85)";
            stuff[j + 1].style.background = "rgb(5, 62, 85)";
            if (parseInt(stuff[j].style.height) > parseInt(stuff[j + 1].style.height)) {
                await sleep(delay);
                //console.log(delay);
                var temp = stuff[j];
                stuff[j] = stuff[j + 1];
                stuff[j + 1] = temp;
                globals.submitAlgorithmBtn.innerHTML = "Sorting..";
                disable();

                let tempheight = stuff[j].style.height;
                stuff[j].style.height = stuff[j + 1].style.height;
                stuff[j + 1].style.height = tempheight;
            }
            stuff[j].style.background = "skyblue";
            stuff[j + 1].style.background = "skyblue";
        }
        stuff[stuff.length - 1 - i].style.background = "green";
    }
    stuff[0].style.background = "green";
    globals.submitAlgorithmBtn.innerHTML = "Sort";
    enable();
}

async function InsertionSort() {
    var stuff = globals.bar.children;
    var l = stuff.length;
    globals.submitAlgorithmBtn.innerHTML = "Sorting..";

    disable();
    stuff[0].style.background = "green";
    for (let i = 1; i < l; i++) {
        let j = i - 1;
        let current = stuff[i].style.height;
        stuff[i].style.background = "blue";
        await sleep(delay);
        while (j >= 0 && parseInt(stuff[j].style.height) > parseInt(current)) {
            changeColor(stuff[j], "blue");
            stuff[j + 1].style.height = stuff[j].style.height;
            j--;

            await sleep(delay);

            for (let r = i; r >= 0; r--) {
                changeColor(stuff[r], "green");
            }
        }
        stuff[j + 1].style.height = current;
        changeColor(stuff[i], "green");
    }
    globals.submitAlgorithmBtn.innerHTML = "Sort";
    enable();
}

async function MergeSort() {
    //// smth is wrong, and i dunno what
    // async function mergeArrays(leftArray, rightArray) {
    //     let ary = [];
    //     while (leftArray.length && rightArray.length) {
    //         await sleep(delay);
    //         const leftNode = leftArray[0];
    //         const rightNode = rightArray[0];
    //         leftNode.style.background = "blue";
    //         rightNode.style.background = "blue";
    //         const leftNum = parseFloat(leftArray[0].style.height);
    //         const rightNum = parseFloat(rightArray[0].style.height);
    //         if (leftNum < rightNum) {
    //             ary.push(leftArray.shift());
    //         } else {
    //             ary.push(rightArray.shift());
    //         }
    //         await sleep(delay);
    //         leftNode.style.background = "skyblue";
    //         rightNode.style.background = "skyblue";
    //     }
    //     for (const arr of [ary, leftArray, rightArray]) {
    //         const heights = arr.map((res) => parseFloat(res.style.height)).sort((a, b) => (a > b ? -1 : 1));
    //         for (let i = 0; i < arr.length; i++) {
    //             arr[i].style.background = "blue";
    //             await sleep(delay * 0.8);
    //             arr[i].style.height = `${heights[i]}px`;
    //             await sleep(delay * 0.8);
    //             arr[i].style.background = "skyblue";
    //         }
    //     }
    //     return [...ary, ...leftArray, ...rightArray];
    // }
    // async function merge_sort(unsortedArray) {
    //     const midle_index = unsortedArray.length / 2;
    //     if (unsortedArray.length < 2) {
    //         return unsortedArray;
    //     }
    //     const leftArray = unsortedArray.splice(0, midle_index);
    //     return await mergeArrays(await merge_sort(leftArray), await merge_sort(unsortedArray));
    // }
    // await merge_sort(Array.from(globals.bar.children));
}

Array.prototype.isSorted = function () {
    let second_index;
    for (let first_index = 0; first_index < this.length; first_index++) {
        second_index = first_index + 1;
        if (this[second_index] - this[first_index] < 0) return false;
    }
    return true;
};

async function QuickSort() {
    // broken quick sort, almost works but not quite

    async function inner(arr) {
        // Base case
        if (!arr.length) return [];
        const [head, ...tail] = arr,
            left = [],
            right = [];

        changeColor(head, "green");
        for (const e of tail) {
            changeColor(e, "blue");

            await sleep(delay);
            if (getVal(e) < getVal(head)) left.push(e);
            else right.push(e);

            changeColor(e, "skyblue");
        }
        changeColor(head, "skyblue");

        const leftVals = left.map(getVal),
            rightVals = right.map(getVal),
            headVal = getVal(head);

        for (let i = 1; i < arr.length; i++) {
            if (i < leftVals.length) {
                arr[i].style.height = `${leftVals[i]}px`;
            } else if (i === leftVals.length) {
                arr[i].style.height = `${headVal}px`;
            } else if (rightVals.length) {
                arr[i].style.height = `${rightVals[i - leftVals.length - 1]}px`;
            }
        }

        return (await inner(left)).concat(head, await inner(right));
    }

    disable();
    const array = Array.from(globals.bar.children);
    console.log(await inner(array));
    enable();
}

async function selectionSort() {
    console.log("selection sort is sorted");
}

const algos = {
    BubbleSort,
    InsertionSort,
};

const notImplementedAlgo = (name) => alert(`${name} not completed yet.`);

globals.submitAlgorithmBtn.addEventListener("click", function () {
    const chosenAlgo = globals.algorithms.value;
    const algo = algos[chosenAlgo] || notImplementedAlgo;
    algo(chosenAlgo);
});
