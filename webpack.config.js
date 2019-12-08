const path = require('path');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', //실서비스는: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    }, //알아서 찾아줌

    /* entry output 이 제일 중요 */
    entry: {
        app: ['./client'],
    }, //입력
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    }, // 출력
};