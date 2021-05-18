export default function (matrix) {
  const newMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    newMatrix.push([]);
    for (let j = 0; j < matrix[0].length; j++) {
      newMatrix[i][j] = matrix[i][j];
    }
  }
  return newMatrix;
}
