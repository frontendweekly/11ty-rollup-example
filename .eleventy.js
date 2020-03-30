module.exports = function(config) {
  config.addWatchTarget('./src/_js/');

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats : ['njk', 'md', '11ty.js'],
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
