export default {
    base: "/vanilla-webcomponent-demo/",
    build : {
        // For github pages, leave it readable
        minify: false,
        // For GitHub Pages, put in docs/ folder
        outDir: "docs",
        // This seems to be the way to avoid hashed filenames
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        },
    },
}