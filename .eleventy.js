module.exports = function(eleventyConfig) {
  // Passthroughs
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({"src/css": "css"});
  eleventyConfig.addPassthroughCopy({"src/js": "js"});

  // BrowserSync watch
  eleventyConfig.setBrowserSyncConfig({
    files: ["_site/css/*.css", "_site/js/*.js"]
  });

  // Global data
  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  eleventyConfig.addCollection("flows", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/flows/*.md");
  });

  // Return config
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    passthroughFileCopy: true
  };
};

// add this inside module.exports function
eleventyConfig.addFilter("slug", function(str){ return String(str).toLowerCase().replace(/\s+/g,'-'); });

eleventyConfig.addCollection("tagList", function(collectionApi){
  const tags = new Set();
  collectionApi.getAll().forEach(item => {
    if(item.data.tags) item.data.tags.forEach(t => tags.add(t));
  });
  return [...tags];
});

// create tag pages programmatically
eleventyConfig.addCollection("tagPages", function(collectionApi){
  const tags = new Set();
  collectionApi.getFilteredByGlob("src/posts/*.md").forEach(item => {
    if(item.data.tags) item.data.tags.forEach(t => tags.add(t));
  });
  return [...tags].map(tag => {
    return {
      tag,
      url: `/tag/${tag.toLowerCase().replace(/\s+/g,'-')}/`
    };
  });
});
