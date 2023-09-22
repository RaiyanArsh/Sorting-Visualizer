let randomize_array = document.getElementById("randomize_array_btn");
let Msort_btn = document.getElementById("Msort_btn");
let sort_btn = document.getElementById("sort_btn");
let Qsort_btn = document.getElementById("Qsort_btn");
let bars_container = document.getElementById("bars_container");
let minRange = 1;
let maxRange = 20;
let BarsNum = 60;
let heightFactor = 20;
let speedFactor = 95;
let u_arr = new Array(BarsNum);


function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RandomArray() {
  let a = new Array(BarsNum);
  for (let i = 0; i < BarsNum; i++) {
    a[i] = randomNum(minRange, maxRange);
  }

  return a;
}

document.addEventListener("DOMContentLoaded", function () {
  u_arr = RandomArray();
  makeBars(u_arr);
});

function makeBars(array) {
  for (let i = 0; i < BarsNum; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  u_arr = RandomArray();
  bars_container.innerHTML = "";
  makeBars(u_arr);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        bars[j].style.height = arr[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "blue";
        bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "blue";
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return arr;
}

sort_btn.addEventListener("click",async function () {
  sort_btn.disabled = true; // Disable the sorting button
  Msort_btn.disabled = true; // Disable the sorting button
  Qsort_btn.disabled = true;
  randomize_array.disabled = true; 
  await bubbleSort(u_arr);
  sort_btn.disabled = false; // Disable the sorting button
  Msort_btn.disabled = false; // Disable the sorting button
  Qsort_btn.disabled = false;
  randomize_array.disabled = false; 

  });
  async function mergeSort(arr, start, end) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      
      // Recursively sort the left and right halves
      await mergeSort(arr, start, mid);
      await mergeSort(arr, mid + 1, end);
      
      // Merge the sorted halves
      await merge(arr, start, mid, end);
    }
  }
  
  async function merge(arr, start, mid, end) {
    const n1 = mid - start + 1;
    const n2 = end - mid;
    
    // Create temporary arrays to hold the left and right halves
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);
    
    // Copy data to temporary arrays leftArray[] and rightArray[]
    for (let i = 0; i < n1; i++) {
      leftArray[i] = arr[start + i];
    }
    for (let i = 0; i < n2; i++) {
      rightArray[i] = arr[mid + 1 + i];
    }
    
    let i = 0, j = 0, k = start;
    
    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      
      // Change the height and color of bars for visualization
      updateBar(arr, k, arr[k]);
      await sleep(speedFactor);
      
      k++;
    }
    
    // Copy the remaining elements of leftArray[], if any
    while (i < n1) {
      arr[k] = leftArray[i];
      updateBar(arr, k, arr[k]);
      await sleep(speedFactor);
      i++;
      k++;
    }
    
    // Copy the remaining elements of rightArray[], if any
    while (j < n2) {
      arr[k] = rightArray[j];
      updateBar(arr, k, arr[k]);
      await sleep(speedFactor);
      j++;
      k++;
    }
  }
  
  async function updateBar(arr, index, height) {
    let bars = document.getElementsByClassName("bar");
    bars[index].style.height = height * heightFactor + "px";
    bars[index].style.backgroundColor = "blue";
    await sleep(speedFactor);
    bars[index].style.backgroundColor = "aqua";
  }

Msort_btn.addEventListener("click", async function () {
  // resetBarColors(); // Reset bar colors before sorting
  sort_btn.disabled = true; // Disable the sorting button
  Msort_btn.disabled = true;
  Qsort_btn.disabled = true; // Disable the sorting button
  randomize_array.disabled = true; 
  await mergeSort(u_arr, 0, u_arr.length - 1);
  Msort_btn.disabled = false;
  sort_btn.disabled = false;
  Qsort_btn.disabled = false;
  randomize_array.disabled = false; 
  // await mergeSort(u_arr, 0, u_arr.length - 1);
});

async function quickSort(arr, low, high) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = await partition(arr, low, high);

    // Recursively sort the elements before and after the pivot
    await quickSort(arr, low, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, high);
  }
}

async function partition(arr, low, high) {
  // Choose the rightmost element as the pivot
  const pivot = arr[high];
  
  // Index of the smaller element
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // If the current element is smaller than or equal to the pivot
    if (arr[j] <= pivot) {
      i++;
      // Swap arr[i] and arr[j]
      swap(arr, i, j);
      // Change the height and color of bars for visualization
      updateBar(arr, i, arr[i]);
      updateBar(arr, j, arr[j]);
      await sleep(speedFactor);
    }
  }

  // Swap arr[i+1] and arr[high] (pivot)
  swap(arr, i + 1, high);
  // Change the height and color of bars for visualization
  updateBar(arr, i + 1, arr[i + 1]);
  updateBar(arr, high, arr[high]);
  await sleep(speedFactor);

  return i + 1;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

Qsort_btn.addEventListener("click", async function () {
  // resetBarColors(); // Reset bar colors before sorting
  sort_btn.disabled = true; // Disable the sorting button
  Msort_btn.disabled = true; // Disable the sorting button
  Qsort_btn.disabled = true;
  randomize_array.disabled = true;  // Disable the sorting button
  await quickSort(u_arr, 0, u_arr.length - 1);
  Qsort_btn.disabled = false;
  Msort_btn.disabled = false;
  sort_btn.disabled = false;
  randomize_array.disabled = false;  // Enable the sorting button after completion
});