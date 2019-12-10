const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

//const WordRelay = require('./component/WordRelay.js');
//const BaseBall = require('./component/BaseBall.jsx');
import BaseBall from './component/BaseBall.jsx';

//const Hot = hot(WordRelay);
const Hot = hot(BaseBall);

ReactDOM.render(<Hot />, document.querySelector('#root'));