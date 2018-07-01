export function rowCreator(rowLength) {
  return Array.from({ length: rowLength }).map(() => false);
}

export function createGrid(dimensions = 50) {
  return Array.from({ length: dimensions }).map(() => rowCreator(dimensions));
}

export function cloneArray(arr) {
  return JSON.parse(JSON.stringify(arr));
}
