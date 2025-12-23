
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change 'banking-app-clone' to your actual repository name
  base: '/banking-app-clone', 
  build: {
    outDir: 'dist',
  }
});
