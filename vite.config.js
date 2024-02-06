import {defineConfig} from "vite";

const pagesInput = {}

export default defineConfig({
    build: {
        target: 'es2017',
        outDir: 'build',
        rollupOptions: {
            input: {
                ...pagesInput
            }
        }
    }
})