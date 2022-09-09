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

function sleep(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, delay);
    });
}

//sorting algorithms
//bubble sort
async function bubbleSort() {
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

//insertionSort
async function insertionSort() {
    var stuff = globals.bar;
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
            stuff[j].style.background = "blue";
            stuff[j + 1].style.height = stuff[j].style.height;
            j--;

            await sleep(delay);

            for (let r = i; r >= 0; r--) {
                stuff[r].style.background = "green";
            }
        }
        stuff[j + 1].style.height = current;
        stuff[i].style.background = "green";
    }
    globals.submitAlgorithmBtn.innerHTML = "Sort";
    enable();
}

//merge sort
async function mergeSort() {
    console.log("merge sort is sorted");
}
async function quickSort() {
    console.log("quick sort is sorted");
}

async function selectionSort() {
    console.log("selection sort is sorted");
}

algorithmSelect = globals.algorithms;

let selected = "";
algorithmSelect.addEventListener("change", function () {
    selected = algorithmSelect.options[algorithmSelect.selectedIndex].text;
    console.log("selected inside", selected);
});

globals.submitAlgorithmBtn.addEventListener("click", function () {
    console.log("selected:", selected);
    switch (selected) {
        case "Bubble sort":
            bubbleSort();
            break;
        case "Insertion sort":
            insertionSort();
            break;
        case "Merge sort":
            alert("Not completed yet");
            break;
        case "Quick sort":
            alert("Not completed yet");
            break;
        case "Selection sort":
            alert("Not completed yet ");
            break;
        default:
            bubbleSort();
            console.log("Default");
            break;
    }
});

//written by akhilesh
