import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        // Temporarily disabled - having issues finding PHP in PATH
        // wayfinder({
        //     formVariants: true,
        //     phpBinary: '/usr/bin/php',
        // }),
        {
            name: 'resolve-index',
            resolveId(source) {
                // Auto-resolve directory imports to index.ts files
                if (source.startsWith('@/routes') && !source.includes('.')) {
                    const resolved = source.replace('@/', './resources/js/');
                    return path.resolve(__dirname, resolved, 'index.ts');
                }
            },
        },
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    esbuild: {
        jsx: 'automatic',
    },
});
