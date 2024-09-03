import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { url } from './config/api'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 12005,
        proxy: {
            '/api': {
                target: url,
                changeOrigin: true,
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            config: path.join(__dirname, 'config')
        }
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'main.js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'style.css' // 生产模式下的样式文件名
                    }
                    return assetInfo.name // 其他文件保持原名
                }
            }
        }
    }
})
