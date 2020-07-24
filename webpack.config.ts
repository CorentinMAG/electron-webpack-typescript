import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Configuration} from 'webpack';

export default (env:any , argv:Configuration) => {
  //on convertit en boolean, si ça vaut 0 null,undefined renvoie false sinon true
  const MAIN = !!(env && env.main); 
  return {
    mode:'development',
    watch:true,
    target: MAIN ? 'electron-main' : 'web',
    entry: MAIN ? './src/main/main.ts' : './src/renderer/login-component/login.ts',
    output: {
      path: path.resolve(__dirname,'dist'),
      filename: MAIN ? 'main.js' : 'renderer.js',
    },
    devtool: 'inline-source-map',
    node: { 
      //on choisit ou non de simuler certaines variables globale de node.js. 
      //Ainsi ces variables pourront être utilisés dans d'autres environnement que node comme le navigateur
      //si true -> fournit 1 polyfill
      //si 'mock' -> fournit 1 variable mais qui a peu de fonctionnalités
      // si 'empty' -> fournit un objet vide
      // si false -> ne fournit rien du tout, le code peut cracher
      __dirname: false,
      __filename: false,
      fs:false
    },
    resolve: { //when import 'lodash' webpack will look for .js,.jsx,.ts and .tsx files
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      //pour chaque extension que webpack rencontre, il va charger un loader spécifique
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
  
          ],
        },
        {
          test:/\.css$/,
          use:[
            'style-loader','css-loader'
            ]
        },{
          test:/\.html$/,
          use:[
            {
              loader:'html-loader'
            }
          ]
        }
          ],
        },
        devServer: {
          contentBase: path.join(__dirname, 'dist'),
          port: 9000
   },
    plugins: MAIN ? [] : [
    new HtmlWebpackPlugin({
      title:"My First Electron App"
    }
    )
    ]
}
}

