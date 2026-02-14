export const getAccessToken = () => localStorage.getItem('bereketli_access');
export const getRefreshToken = () => localStorage.getItem('bereketli_refresh');
export const getUserId = () => localStorage.getItem('user_id');

export const setAccessToken = (token) => localStorage.setItem('bereketli_access', token);
export const setRefreshToken = (token) => localStorage.setItem('bereketli_refresh', token);
export const setUserId = (id) => localStorage.setItem('user_id', id);

export const clearTokens = () => {
  localStorage.removeItem('bereketli_access');
  localStorage.removeItem('bereketli_refresh');
  localStorage.removeItem('user_id')
};

export const isTokenExpired = (token) => {
  try {
    if (!token) return true; // No token means expired
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const exp = payload.exp; // Expiration time in seconds (Unix timestamp)
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    return exp < now; // Returns true if token is expired, false otherwise
  } catch (error) {
    console.error("Invalid token", error);
    return true; // Treat invalid tokens as expired
  }
}