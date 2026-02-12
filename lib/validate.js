export function isValidUrl(str) {
  try {
    // URL will throw for invalid strings
    // allow only http/https
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

export default isValidUrl;
