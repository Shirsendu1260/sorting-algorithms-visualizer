function selectionSort(array, moves) {
    var i, j, k = 0;

    // For n no. number of elements, perform (n-1) no. of passes
    for (i = 0; i < array.length - 1; i++) {
        k = i;

        for (j = i; j < array.length; j++) {
            if (array[k] > array[j]) {
                k = j;
            }
        }

        // At this moment, 'k' should point on to the smallest element in the pass
        // If it is, then 'k' is not on index 'i', so swap kth element with the element at index i
        if (k !== i) {
            moves.push({ indices: [i, k], swap: true });
            [array[i], array[k]] = [array[k], array[i]];
        } else {
            moves.push({ indices: [i, k], swap: false });
        }
    }
}