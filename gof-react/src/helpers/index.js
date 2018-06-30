export function rowCreator(rowLength) {
  return Array.from({ length: rowLength }).map(() => false);
}

export function createGrid(rows = 50, cols = 50) {
  return Array.from({ length: rows }).map(() => rowCreator(cols));
}
