export const base64ToBlob = (base64, mimeType = "image/jpeg") => {
  // Split the base64 string to handle the data URL format
  const byteString = atob(base64.split(",")[1]); // Decode base64 string
  const arrayBuffer = new ArrayBuffer(byteString.length); // Create an ArrayBuffer
  const uint8Array = new Uint8Array(arrayBuffer); // Create a typed array

  // Fill the typed array with the binary data
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create and return a Blob with the specified MIME type
  return new Blob([uint8Array], { type: mimeType });
};
