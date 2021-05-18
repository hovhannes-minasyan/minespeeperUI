export default function (matrix) {
  const a = matrix.length;
  const b = matrix[0].length;
  const newMatrix = [];
  for (let i = 0; i < a; i++) {
    newMatrix.push([]);
    for (let j = 0; j < b; j++) {
      newMatrix[i][j] = matrix[i][j];
    }
  }
  return newMatrix;
}
