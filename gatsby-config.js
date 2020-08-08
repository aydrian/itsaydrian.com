module.exports = {
  siteMetadata: {
    title: `Aydrian Howard: Developer Advocate 👨🏻‍💻🥑`,
    description: `Aydrian Howard. Hoosier in the Big City. NYC. Pug Dad. Uncle. Nerd. Developer Advocate at Courier.`,
    author: `@itsaydrian`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `itsaydrian.com`,
        short_name: `itsaydrian.com`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/avocado-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        // Accepts all options defined by `gatsby-plugin-postcss` plugin.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
