module.exports = function solveSudoku(matrix) {
    // your solution

    function isSolved(number) {
        return number.every(isSolved2);
    }

    function isSolved2(number) {
        return number != 0;
    }


    function checkRow(numberRow) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(item) {
            var a = false;
            for (var i = 0; i < 9; i++) {
                if (item == matrix[numberRow][i]) {
                    a = true;
                    break;
                }
            }
            return !a;
        });
    }

    function checkColumn(numberColumn) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(item) {
            var a = false;
            for (var i = 0; i < 9; i++) {
                if (item == matrix[i][numberColumn]) {
                    a = true;
                    break;
                }
            }
            return !a;
        });
    }

    function checkSquare(numberRow, numberColumn) {
        masRC = [];
        masRC[0] = numberRow / 3 < 1 ? 0 : numberRow / 3 < 2 && numberRow / 3 >= 1 ? 3 : 6;
        masRC[1] = numberColumn / 3 < 1 ? 0 : numberColumn / 3 < 2 && numberColumn / 3 >= 1 ? 3 : 6;
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(item) {
            var a = false;
            for (var i = masRC[0]; i < masRC[0] + 3; i++)
                for (var j = masRC[1]; j < masRC[1] + 3; j++) {
                    if (item == matrix[i][j]) {
                        a = true;
                        break;
                    }
                }
            return !a;
        });
    }

    function findMaxArray(masR, masC, masSc) {
        max = Math.max.apply(null, [masR.length, masC.length, masSc.length]);
        return [masR, masC, masSc].filter(function(item) {
            return item.length == max;
        })
    }

    function findPermissibleNumbers(maxArray, masR, masC, masSC) {
        var masSol = [];
        for (var i = 0; i < maxArray.length; i++) {
            if (masR.indexOf(maxArray[i]) != -1 && masC.indexOf(maxArray[i]) != -1 && masSC.indexOf(maxArray[i]) != -1)
                masSol.push(maxArray[i]);
        }
        return masSol;
    }


    function main(begin) {

        var masR = [],
            masC = [],
            masSC = [];
        if (matrix.every(isSolved)) return true;
        for (var i = 0; i < matrix.length; i++)
            for (var j = 0; j < matrix.length; j++) {
                if (matrix[i][j] == 0) {
                    masR = checkRow(i);
                    masC = checkColumn(j);
                    masSC = checkSquare(i, j);
                    var maxArray = findMaxArray(masR, masC, masSC);
                    maxArray = maxArray[0];
                    var PermissibleNumbers = findPermissibleNumbers(maxArray, masR, masC, masSC);

                    for (var p = 0; p < PermissibleNumbers.length; p++) {
                        matrix[i][j] = PermissibleNumbers[p];
                        if (main(begin)) return true;
                        matrix[i][j] = 0;
                    }
                    return false;
                }

            }
    }

    main(matrix);
    return matrix;

}