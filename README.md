
# React

# CDN
babel : <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
react: <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
reactDOM: <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

# WebPack 설치하기
## 1. npm init
{author : 'username' , license : 'MIT'}
## 2. npm i -D react react-dom webpack webpack-cli
develope mode로 react react-dom webpack webpack-cli 설치
## 3. webpack.config.js 만들기
```js
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
```
## 4. html 내용 수정
```html
  <div id = "root"></div>
  <script src = "./dist/app.js"></script>
```
## 5. client.jsx 만들기
``` jsx
const React = require('react');
const ReactDOM = require('react-dom');
```
## 6. 컴포넌트.js 만들기
```js
  const React = require('React');
  const {Component} = React;
  class 컴포넌트이름 extends Component {
    state = {
  };
  render() {
  
  };
}
module.exports = 컴포넌트이름;
```
## 7. babel 설치하기
```npm
npm i -D @babel/preset-en @babel/core @babel/plugin-proposal-class-properties @babel/preset-react babel-loader
```
  1. @babel/core : babel의 기본적인거
  2. @babel/preset-evn : 최신문법을 예전 문법으로
  4. @babel/preset-react : jsx바꿔주는거
  3. babel-loader : 바벨이랑 연결해주는거


