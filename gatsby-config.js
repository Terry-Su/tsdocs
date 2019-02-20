module.exports = {
  siteMetadata: {
    title: `TSDocs`,
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes : true,
        // Pedantic mode (default: true)
        pedantic  : true,
        // GitHub Flavored Markdown mode (default: true)
        gfm       : true,
        // Plugins configs
        plugins   : [],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `src`,
        path: `${__dirname}/content/`,
      },
    },
  ]
}