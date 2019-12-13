const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

//const WordRelay = require('./component/WordRelay.js');
//const BaseBall = require('./component/BaseBall.jsx');
import BaseBall from './component/BaseBall.jsx';
import BaseBallHooks from './component/BaseBallHooks.jsx';
import ResponseCheck from './component/ResponseCheck.jsx';
import ResponseCheckHooks from './component/ResponseCheckHooks.jsx';
import RSP from './component/RSP.jsx';
//const Hot = hot(WordRelay);
//const Hot = hot(BaseBall);
//const Hot = hot(BaseBallHooks);
//const Hot = hot(ResponseCheckHooks);
const Hot = hot(RSP);

ReactDOM.render(<Hot />, document.querySelector('#root'));
