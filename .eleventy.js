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
  const posts = collectionApi.getFilteredByGlob("src/posts/*.md");

  // For each post, compute related posts (by shared tags) and attach to post.data.related
  posts.forEach(post => {
    const postTags = post.data && post.data.tags ? post.data.tags : [];
    const related = posts
      .filter(p => p.url !== post.url && p.data && p.data.tags && p.data.tags.some(t => postTags.includes(t)))
      .slice(0, 3);
    post.data.related = related;
  });

  return posts;
});


  eleventyConfig.addCollection("flows", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/flows/*.md");
  });

  // Filter: slug
  eleventyConfig.addFilter("slug", function(str){
    return String(str).toLowerCase().replace(/\s+/g,'-');
  });

  // tagList collection (all tags)
  eleventyConfig.addCollection("tagList", function(collectionApi){
    const tags = new Set();
    collectionApi.getAll().forEach(item => {
      if(item.data && item.data.tags) item.data.tags.forEach(t => tags.add(t));
    });
    return [...tags];
  });

  // create tag pages programmatically
  eleventyConfig.addCollection("tagPages", function(collectionApi){
    const tags = new Set();
    collectionApi.getFilteredByGlob("src/posts/*.md").forEach(item => {
      if(item.data && item.data.tags) item.data.tags.forEach(t => tags.add(t));
    });
    return [...tags].map(tag => {
      return {
        tag,
        url: `/tag/${tag.toLowerCase().replace(/\s+/g,'-')}/`
      };
    });
  });

  // Return config
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    passthroughFileCopy: true,
    // Use Nunjucks to render Markdown files so {% set %} works
    markdownTemplateEngine: "njk",
    // Optional: use Nunjucks for HTML templates too
    htmlTemplateEngine: "njk"
  };
};

const { DateTime } = require("luxon");

eleventyConfig.addFilter("date", (dateObj, format = "yyyy-LL-dd") => {
  if (!dateObj) return "";
  return DateTime.fromJSDate(dateObj instanceof Date ? dateObj : new Date(dateObj)).toFormat(format);
});
