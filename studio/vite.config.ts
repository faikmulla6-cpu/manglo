import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  base:'/studio/', plugins:[react(),tailwindcss()], publicDir:false,
  resolve:{alias:{'@':root}},
  build:{outDir:'../dist/studio',assetsDir:'react-assets',emptyOutDir:true},
  server:{proxy:{'/api':{target:'http://127.0.0.1:4173',changeOrigin:true,headers:{origin:'http://127.0.0.1:4173'}},'/studio/assets':'http://127.0.0.1:4173'}},
})
