// Function to merge two sorted segments of an array into a single one
function mergeSortedSegments(array, low, mid, high, moves) {
    var i, j, k;

    // Create a temporary buffer array to store merged elements
    const temp_array = new Array(high - low + 1);

    i = low; // 'i' placed at the first index of the left array segment
    j = mid + 1; // 'j' placed at the first index of the right array segment
    k = low; // 'k' placed at the first index of the buffer array

    // Merge those two array segments into the new array in sorted order
    while (i <= mid && j <= high) {
        if (array[i] < array[j]) {
            // Record the indices of the compared elements 
            moves.push({ indices: [i, j], swap: false });

            temp_array[k++] = array[i++];
        }
        else {
            // Record the indices of the compared elements
            moves.push({ indices: [i, j], swap: false });

            temp_array[k++] = array[j++];
        }
    }

    // Copy the remaining elements (if any) from left array segment into the new array
    while (i <= mid) {
        // Record the index of the copied element 
        moves.push({ indices: [i], swap: false });

        temp_array[k++] = array[i++];
    }

    // Copy the remaining elements (if any) from right array segment into the new array
    while (j <= high) {
        // Record the index of the copied element 
        moves.push({ indices: [j], swap: false });

        temp_array[k++] = array[j++];
    }

    // Copy the sorted elements from the new array back to the original one
    for (let i = low; i <= high; i++) {
        // 'animate' function expects indices that involved in a swap to visualize the swapping process
        // So record the indices that involve in overwrite to imitate the similar swapping behavior where we overwrite elements from the buffer array back to the original one
        moves.push({ indices: [i], swap: true, value: temp_array[i] });

        array[i] = temp_array[i];
    }
}


function mergeSort(array, low, high, moves) {
    var mid;

    // If there are at least two elements in the array
    if (low < high) {
        // Get the middle index of the array
        mid = Math.floor((low + high) / 2);

        // Perform merge sort recursively on left side of the middle index (including the middle index)
        mergeSort(array, low, mid, moves);

        // Perform merge sort recursively on right side of the middle index
        mergeSort(array, mid + 1, high, moves);

        // Merge these two sorted halves of the array segment into a single one
        mergeSortedSegments(array, low, mid, high, moves);
    }
}