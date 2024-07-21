// Function to rearrange the elements in the array such that elements less than the pivot are on its left and elements greater than the pivot are on its right
// It returns the final sorted position of the pivot
function partition(array, low, high, moves) {
    var i, j, pivot;
    pivot = array[low];
    i = low;
    j = high;

    // Loop will run at least there are two elements in the array
    do {
        // 'i' is responsible for finding the element greater than the pivot element
        do { i++; } while (array[i] <= pivot);

        // 'j' is responsible for finding the element less than or equal to the pivot element
        do { j--; } while (array[j] > pivot);

        // If 'i' and 'j' both do not cross each other, if they do then we can say the array is completely traversed
        // Then perform swap between them
        if (i < j) {
            moves.push({ indices: [i, j], swap: true });
            [array[i], array[j]] = [array[j], array[i]];
        }
        else {
            moves.push({ indices: [i, j], swap: false });
        }
    } while (i < j);

    // At this moment 'i' crosses 'j' and the array is completely traversed
    // So perform swap between the pivot and jth element
    moves.push({ indices: [low, j], swap: true });
    [array[low], array[j]] = [array[j], array[low]];

    // 'j' is the final partitioning position where the pivot is sorted
    return j;
}


function quickSort(array, low, high, moves) {
    var partition_index = 0;

    // If there are at least two elements in the array
    if (low < high) {
        // Get the partitioning index
        partition_index = partition(array, low, high, moves);

        // Perform quick sort recursively on left side of the partitioning index
        quickSort(array, low, partition_index, moves);

        // Perform quick sort recursively on right side of the partitioning index
        quickSort(array, partition_index + 1, high, moves);
    }
}