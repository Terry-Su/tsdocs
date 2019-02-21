const path = require( 'path' )

module.exports = ( {
  stage,
  rules,
  loaders,
  plugins,
  actions,
} ) => {
  actions.setWebpackConfig( {
    // module: {
    //   rules: [
    //     // {
    //     //   test   : /\.ts*?/,
    //     //   use    : "ts-loader",
    //     //   // include: __dirname
    //     //   exclude: /node_modules/
    //     // },
    //     // {
    //     //   test: /\.css$/,
    //     //   use : [ "style-loader", "css-loader" ]
    //     // },
    //     // {
    //     //   test: /\.scss$/,
    //     //   use : [
    //     //     "style-loader", // creates style nodes from JS strings
    //     //     "css-loader", // translates CSS into CommonJS
    //     //     "sass-loader" // compiles Sass to CSS
    //     //   ]
    //     // },
    //     // {
    //     //   test  : /\.(png|woff|woff2|eot|ttf|svg)$/,
    //     //   loader: "url-loader?limit=100000000"
    //     // }
    //   ]
    // },
    resolve: {
      extensions: [ ".ts", ".tsx", ".js" ],
      alias     : {
        '@': path.resolve( __dirname, '../src' )
      }
    }
  } )
}
