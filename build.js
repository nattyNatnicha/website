const Metalsmith = require('metalsmith');
const postcss = require('metalsmith-postcss');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');
const inlinesource = require('metalsmith-inline-source');

Metalsmith(__dirname)
.metadata({
  title: "nattyNatnicha",
  description: "natty web site",
  url: "https://nattynatnicha.github.io/"
})
.source('src')
.destination('public')
.clean(true)
.use(postcss({
  plugins: {
    'postcss-import': {},
    'postcss-custom-media': {},
    'postcss-custom-properties': {preserve: 'computed'},
    'postcss-remove-root': {},
    'postcss-calc': {},
    'cssstats': {},
    'postcss-discard-comments': {},
    'autoprefixer': {},
    'postcss-reporter': {},
    'cssnano': {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    }
  },
  map: false
}))
.use(assets({
  source: 'assets',
  destination: '.'
}))
.use(markdown())
.use(permalinks({
  relative: false
}))
.use(layouts({
  directory: 'layouts',
  engine: 'handlebars'
}))
.use(inlinesource({
  compress: false
}))
.build(function(err, files) {
  if (err) { throw err; }
  console.log('Done!');
});
