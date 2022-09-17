export const preloadImage = (url: string, callback: (error: unknown | null) => void) => {
  const img = new Image();
  img.src = url;
  img.onload = () => callback(null);
  img.onerror = (e) => callback(e);
};
