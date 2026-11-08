// Real pixel size of every screenshot in public/shots/. Giving <img> its width/height lets the
// browser reserve the space before a lazy image loads, so the page doesn't jump while scrolling.
// When you add a screenshot, add its size here (any image viewer shows it).
const sizes: Record<string, [number, number]> = {
  "/shots/fx-currencies.webp": [780, 1416],
  "/shots/fx-metals.webp": [780, 1108],
  "/shots/koga-analytics.webp": [1600, 1000],
  "/shots/koga-daily-report.webp": [1600, 1000],
  "/shots/koga-dashboard.webp": [1600, 1000],
  "/shots/koga-m-analysis.webp": [780, 1688],
  "/shots/koga-m-dashboard.webp": [780, 1688],
  "/shots/koga-m-sales.webp": [780, 1688],
  "/shots/koga-pos.webp": [1600, 1000],
  "/shots/koga-reorder.webp": [1600, 1000],
  "/shots/koga-sales.webp": [1600, 1000],
  "/shots/pizza-home.webp": [780, 1688],
  "/shots/pizza-kitchen.webp": [780, 1688],
  "/shots/pizza-menu.webp": [780, 1688],
};

export const dims = (src: string) => {
  const s = sizes[src];
  return s ? { width: s[0], height: s[1] } : {};
};
