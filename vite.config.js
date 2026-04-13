import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Special_one/', // Ensure assets are loaded correctly when opened as a file
});
