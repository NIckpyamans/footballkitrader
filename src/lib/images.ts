const fallbackImages = [
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
];

export function safeProductImages(images: string[] | undefined, fallbackSeed = "") {
  const valid = (images ?? []).filter((image) => {
    try {
      const url = new URL(image);
      return ["https:", "http:"].includes(url.protocol);
    } catch {
      return false;
    }
  });

  if (valid.length > 0) return valid;
  const index = Math.abs(Array.from(fallbackSeed).reduce((sum, char) => sum + char.charCodeAt(0), 0)) % fallbackImages.length;
  return [fallbackImages[index]];
}

export function primaryProductImage(images: string[] | undefined, fallbackSeed = "") {
  return safeProductImages(images, fallbackSeed)[0];
}
