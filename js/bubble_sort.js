function bubbleSort(array, moves) {
    var i, j, flag;

    // For n no. number of elements, perform (n-1) no. of passes
    for (i = 0; i < array.length - 1; i++) {
        // 'flag' variable is used to denote whether a swap occurs (when 'true') or not (when 'false')
        flag = false;

        // For n no. number of elements, we need to perform (n-1-i) no. of comparisons
        // Since, in each pass, one comparison should reduce
        for (j = 0; j < array.length - 1 - i; j++) {
            // If both of them are not in sorted order, perform swap on them
            if (array[j] > array[j + 1]) {
                moves.push({ indices: [j, j + 1], swap: true });
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                flag = true;
            }
            else {
                moves.push({ indices: [j, j + 1], swap: false });
            }
        }

        // Check if swapping was done before or not
        if (flag == false)
            return moves;
    }
}