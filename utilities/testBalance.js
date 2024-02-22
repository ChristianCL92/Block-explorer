export function validateAccountNotEmpty(value) {
  if (value.trim().length === 0) {
    throw new Error('Public address is missing');
  }
}
