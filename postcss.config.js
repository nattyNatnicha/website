module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-custom-properties')({
      preserve: 'computed'
    }),
    require('postcss-remove-root'),
    //require('postcss-custom-properties'),
    require('postcss-calc'),
    require('cssstats'),
    require('postcss-discard-comments'),
    require('autoprefixer'),
    require('postcss-reporter')
  ]
}
