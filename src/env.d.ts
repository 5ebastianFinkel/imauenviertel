/// <reference types="vite/client" />

// vite-imagetools: `import image from "./photo.webp?w=480;800&format=webp&as=img"`
declare module "*&as=img" {
  const image: { src: string; w: number; h: number; srcset?: string };
  export default image;
}
