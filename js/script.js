const n = 60;
const array = [];
var algo = 0;

// Variable to track whether the animation is running or not
var playStatus = true;

// Variable to track whether the animation is stopped or not
var stopStatus = false;

// It is an array having the objects that records the indices either they involved in a swap or a comparison
// We will also record the indices that involve in overwrite process in merge sort algorithm
var moves = [];



// Get the input range element (that will be responsible for selecting visualization speed) by its id
const visSpeedSelector = document.getElementById('speed-selector');

// Store the visualization speed using event listener when input is provided
var visSpeed = 50;
visSpeedSelector.addEventListener('input', function () {
    visSpeed = visSpeedSelector.value;
});
// console.log(visSpeed);

// Get the span element that will show the speed level above the input range
const speedLevel = document.getElementById('speed-lvl');

// Dynamically display the visualization speed level above the input range element using event listener when input is provided
visSpeedSelector.addEventListener('input', function () {
    speedLevel.innerHTML = visSpeed / 10;
});

// Select every navbar buttons (including the reset button) at once
const allNavButtons = document.querySelectorAll('.navbar-btns');
// console.log(allNavButtons);



// Function to disable every navbar buttons
function disableNavbarButtons(buttonId) {
    // Loop through every navbar buttons and disable them
    for (let i = 0; i < allNavButtons.length; i++) {
        allNavButtons[i].disabled = true;

        // Remove the highlight css class from all buttons to make it look like no algorithm is currently executing
        allNavButtons[i].classList.remove('highlighted-algo-btn');

        // Add the highlight class to the button of the currently executing algorithm to make it look like it is currently executing
        document.getElementById(buttonId).classList.add('highlighted-algo-btn');
    }
}



// Function to enable reset button after the animation is done or forcefully terminated
function enableResetButton() {
    // Remove the highlight css class from all buttons to make it look like no algorithm is currently executing
    for (let i = 0; i < allNavButtons.length; i++) {
        allNavButtons[i].classList.remove('highlighted-algo-btn');
    }

    document.getElementById('reset-btn').disabled = false;
}



// Function to enable every navbar buttons
function enableNavbarButtons() {
    // Loop through every navbar buttons and enable them
    for (let i = 0; i < allNavButtons.length; i++) {
        allNavButtons[i].disabled = false;
    }
}



// Function to make the animation control buttons (i.e. Play, Pause & Stop) visible when an algorithm started executing
function showAnimationControlButtons() {
    document.getElementById('playBtn').style.display = 'flex';
    document.getElementById('pauseBtn').style.display = 'flex';
    document.getElementById('stopBtn').style.display = 'flex';
}



// Function to make the animation control buttons (i.e. Play, Pause & Stop) invisible when an algorithm visualization is completed or stopped
function hideAnimationControlButtons() {
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
}



// Function to make the animation to play by setting the associated flag variable to 'true'
function playAnimation() {
    playStatus = true;

    // Continue animating if there is at least one visualization (a swap or a comparison or an overwrite) to show
    if (moves.length > 0)
        animate(moves);
}



// Function to make the animation to pause by setting the associated flag variable to 'false'
function pauseAnimation() {
    playStatus = false;
}



// Function to make the animation to terminate in between by setting the associated flag variable to 'true'
function stopAnimation() {
    stopStatus = true;
    playStatus = false;

    // After stopping the animation, hide the buttons as well to make termination effect
    hideAnimationControlButtons();

    // After stopping the visualization, update the container's text having id 'collapseOne' with the mentioned text 
    collapseOne.innerHTML = '<div class="accordion-body">You have terminated the visualization. Reset array to start again.</div>';
}



// Function to display the random values from the array as individual bars on the html document
function displayAllBars(move) {
    // Initially, we will not display any bars to reflect reset effect when this function is called again
    barsCon.innerHTML = '';

    for (var i = 0; i < array.length; i++) {
        // Create a container to display a bar and adjust its height based on array's ith element value
        const bar = document.createElement('div');
        bar.style.height = array[i] * 180 + '%';

        // Add a css class 'bar' for styling
        bar.classList.add('bar');

        // If 'move' includes the current index, then change the corresponding bar's color based on the index's involvement in swapping process
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.swap == false ? '#96C9F4' : '#0d6efd';
        }

        // Append the updated bar to the main container
        barsCon.appendChild(bar);
    }
}



// Function to fill the array with random values
function init() {
    for (var i = 0; i < n; i++) {
        array[i] = Math.random();
    }

    // Since we are starting all over again
    moves = [];
    playStatus = true;
    stopStatus = false;

    // After Initializing, update the container's text having id 'collapseOne' with the mentioned text 
    collapseOne.innerHTML = '<div class="accordion-body">Start visualizing any algorithm to see its time complexity here.</div>';

    enableNavbarButtons();
    displayAllBars();
}



// Function to play Bubble Sort animation
function playBubbleSort() {
    algo = 1;

    // Make a copy of the original array
    const copy = array.slice();

    bubbleSort(copy, moves);

    // Show the control buttons after the animation starts
    showAnimationControlButtons();

    // Since the algorithm's animation is executing at this moment
    stopStatus = false;

    // Animate bars
    animate(moves);
}



// Function to play Insertion Sort animation
function playInsertionSort() {
    algo = 2;

    // Make a copy of the original array
    const copy = array.slice();

    insertionSort(copy, moves);

    // Show the control buttons after the animation starts
    showAnimationControlButtons();

    // Since the algorithm's animation is executing at this moment
    stopStatus = false;

    // Animate bars
    animate(moves);
}



// Function to play Selection Sort animation
function playSelectionSort() {
    algo = 3;

    // Make a copy of the original array
    const copy = array.slice();

    selectionSort(copy, moves);

    // Show the control buttons after the animation starts
    showAnimationControlButtons();

    // Since the algorithm's animation is executing at this moment
    stopStatus = false;

    // Animate bars
    animate(moves);
}



// Function to play Quick Sort animation
function playQuickSort() {
    algo = 4;

    // Make a copy of the original array and append an integer into it
    // Since the array elements are in range of 0 and 1, this appended integer will act as infinity, which is essential for performing quick sort 
    const copy = array.slice();
    copy.push(10);

    quickSort(copy, 0, copy.length - 1, moves);

    // Show the control buttons after the animation starts
    showAnimationControlButtons();

    // Since the algorithm's animation is executing at this moment
    stopStatus = false;

    // Animate bars
    animate(moves);
}



// Function to play Merge Sort animation
function playMergeSort() {
    algo = 5;

    // Make a copy of the original array
    const copy = array.slice();

    mergeSort(copy, 0, copy.length - 1, moves);

    // Show the control buttons after the animation starts
    showAnimationControlButtons();

    // Since the algorithm's animation is executing at this moment
    stopStatus = false;

    // Animate bars
    animate(moves);
}



// Function to animate the swapping process
function animate(moves) {
    // If the animation is paused or stopped, just return
    if (playStatus == false || stopStatus == true)
        return;

    // If there are no indices to visualize, update the text of the container having id 'collapseOne' and return after displaying all of the bars without any kind of visualization
    if (moves.length === 0) {
        collapseOne.innerHTML = '<div class="accordion-body">Reset array and start visualizing any algorithm to see its time complexity here.</div>';
        displayAllBars();

        // Hide the control buttons as we are done animating
        hideAnimationControlButtons();

        // Enable every navbar buttons after we are done animating
        enableNavbarButtons();

        return;
    }

    // console.log(moves);

    // Get the first element from 'moves'
    const move = moves.shift();

    // If the move involves a swap or a comparison, that means two indices are involved
    if (move.indices.length === 2) {
        // Destructure and unpack the indices from the retrieved object
        const [i, j] = move.indices;
        // If the unpacked indices are involved in a swap (definitely not in merge sort), do swap again
        if (move.swap == true)
            [array[i], array[j]] = [array[j], array[i]];
    }
    // If the move involves an overwrite or a transferring of a remaining element, that means only one index is involved
    else if (move.indices.length === 1) {
        // Destructure and unpack the index from the retrieved object
        const [i] = move.indices;
        // If the unpacked index is involved in an overwrite (in merge sort), do overwrite again
        if (move.swap == true)
            array[i] = move.value;
    }

    // Display all of the bars with the highlighted ones
    displayAllBars(move);

    // Recursively call the function again after a delay defined by 'visSpeed'
    setTimeout(function () {
        // If the animation is not paused and not stopped, continue animating the visualization again
        if (playStatus == true && stopStatus == false)
            animate(moves);
    }, visSpeed);
}



// Function to display time complexity of the currently executing sorting algorithm
function displayTimeComplexity() {
    switch (algo) {
        case 1:
            collapseOne.innerHTML = '<div class="accordion-body">Average Case Time Complexity of <b>Bubble</b> Sort is <b>O(n<sup>2</sup>)</b>.</div>';
            break;
        case 2:
            collapseOne.innerHTML = '<div class="accordion-body">Average Case Time Complexity of <b>Insertion</b> Sort is <b>O(n<sup>2</sup>)</b>.</div>';
            break;
        case 3:
            collapseOne.innerHTML = '<div class="accordion-body">Average Case Time Complexity of <b>Selection</b> Sort is <b>O(n<sup>2</sup>)</b>.</div>';
            break;
        case 4:
            collapseOne.innerHTML = '<div class="accordion-body">Average Case Time Complexity of <b>Quick</b> Sort is <b>O(n logn)</b>.</div>';
            break;
        case 5:
            collapseOne.innerHTML = '<div class="accordion-body">Average Case Time Complexity of <b>Merge</b> Sort is <b>O(n logn)</b>.</div>';
            break;
        default:
            collapseOne.innerHTML = '<div class="accordion-body">No sorting algorithm is currently executing.</div>';
    }
}



// initialize all
init();