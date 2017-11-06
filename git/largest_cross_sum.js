function largestCrossSum(matrix) {
    var sums=[];
    var rowsums=[];
    var colsums=[];
    /*Суммы во всех рядах*/
    for(var i=0;i<matrix.length;i++) {
        rowsums[i] = 0;
        for(var k=0; k<matrix[i].length;k++) {
            rowsums[i] += matrix[i][k];

        }
    }
    /*Суммы во всех колонках*/
    for(var i=0;i<matrix[0].length;i++) {
        colsums[i] = 0;
        for(var k=0; k<matrix.length;k++) {
            colsums[i] += matrix[k][i];
        }
    }
   var sumValue;
    for(var rows=0;rows<matrix.length;rows++) {
        for(var cols=0;cols<matrix[0].length;cols++) {
            sumValue = (rowsums[rows]+colsums[cols]) - matrix[rows][cols];
            sums.push(sumValue);
        }
    }

    return Math.max.apply(null,sums);
}
var matrix1 =
    [[1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]];
console.log(largestCrossSum(matrix1));