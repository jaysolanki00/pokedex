const {injectManifest} = require('workbox-build');

var wbConfig = {
"globDirectory": "dist/pokedex/",
  "globPatterns": [
    "bundle.min.js",
    "assets/fonts/**/*.{eot,svg,ttf,woff,woff2}",
    "**.css"
  ],
  "swSrc": "src/sw.js",
  "swDest": "dist/pokedex/sw.js",
  "maximumFileSizeToCacheInBytes": 14 * 1024 * 1024 
};

injectManifest(wbConfig).then(()=>{
    console.log(`SW: generated successfully ! SW generated at: ${wbConfig.globDirectory}`);
}).catch((e)=>{
    console.log(`Failed to generate SW !`);
    console.log(e);
})
