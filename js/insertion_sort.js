function insertionSort(array, moves) {
    var i, j, val = 0;

    // We are assuming 0th element is already in sorted position, so we start from index 1
    // Total (n-1) no. of passes are performed
    for (i = 1; i < array.length; i++) {
        j = i - 1;
        val = array[i];

        // Keep swapping the elements as long as jth element is greater than 'val'
        while (j > -1 && array[j] > val) {
            moves.push({ indices: [j + 1, j], swap: true });
            [array[j + 1], array[j]] = [array[j], array[j + 1]];
            j--;
        }
        moves.push({ indices: [j + 1, j], swap: false });
    }
}