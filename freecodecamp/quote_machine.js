var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// react
import { React } from "https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js";
import { ReactDOM } from "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js";

// redux

import { Redux } from "https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js";
import { ReactRedux } from "https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.1/react-redux.min.js";

var DONOTHING = "DO_NOTHING";

var QuoteMachine = function (_React$Component) {
  _inherits(QuoteMachine, _React$Component);

  function QuoteMachine() {
    _classCallCheck(this, QuoteMachine);

    return _possibleConstructorReturn(this, (QuoteMachine.__proto__ || Object.getPrototypeOf(QuoteMachine)).apply(this, arguments));
  }

  _createClass(QuoteMachine, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.props.quote
      );
    }
  }]);

  return QuoteMachine;
}(React.Component);

var store = Redux.createStore();