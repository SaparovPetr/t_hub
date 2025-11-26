// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./node_modules/@heroui/theme/dist/components/(card|form|input|modal|navbar|spinner|tabs|ripple).js"
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [heroui()];