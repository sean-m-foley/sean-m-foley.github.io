var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QUOTES = [{
  text: "But man is not made for defeat. A man can be destroyed but not defeated.",
  author: "Earnest Hemmingway"
}, {
  text: "When you reach the end of your rope, tie a knot in it and hang on.",
  author: "Franklin D. Roosevelt"
}, {
  text: "It is better to be feared than loved, if you cannot be both.",
  author: "Niccolo Machiavelli"
}, {
  text: "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night.",
  author: "William Blake"
}, {
  text: "No act of kindness, no matter how small, is ever wasted.",
  author: "Aesop"
}, {
  text: "The way to get started is to quit talking and begin doing.",
  author: "Walt Disney"
}, {
  text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
  author: "Steve Jobs"
}, {
  text: "Life is what happens when you're busy making other plans.",
  author: "John Lennon"
}];

// redux 

// action types
var CHANGE = "CHANGE_QUOTE";
// actions

function changeQuote() {
  var x = Math.floor(Math.random() * QUOTES.length);
  return {
    type: CHANGE,
    text: QUOTES[x].text,
    author: QUOTES[x].author
  };
}

// Reducer

function quoteReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case CHANGE:
      return { text: action.text, author: action.author };
    default:
      return state;
  }
}

var store = Redux.createStore(quoteReducer);

// react

var QuoteMachine = function (_React$Component) {
  _inherits(QuoteMachine, _React$Component);

  function QuoteMachine(props) {
    _classCallCheck(this, QuoteMachine);

    var _this = _possibleConstructorReturn(this, (QuoteMachine.__proto__ || Object.getPrototypeOf(QuoteMachine)).call(this, props));

    _this.switchQuote = _this.switchQuote.bind(_this);
    return _this;
  }

  _createClass(QuoteMachine, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // if it was going to be empty, we have to prevent that
      if (this.props.quote === undefined) {
        this.props.getNewQuote();
      }
    }
  }, {
    key: "switchQuote",
    value: function switchQuote() {
      this.props.getNewQuote();
    }
  }, {
    key: "render",
    value: function render() {
      var tweet = "https://twitter.com/intent/tweet?text=" + this.props.text + " – " + this.props.author;
      return React.createElement(
        "div",
        { id: "quote-box" },
        React.createElement(
          "h2",
          { id: "text" },
          this.props.text
        ),
        React.createElement(
          "h4",
          { id: "author" },
          "\u2013 ",
          this.props.author
        ),
        React.createElement(
          "div",
          { id: "button-box" },
          React.createElement(
            "button",
            { id: "new-quote", onClick: this.switchQuote },
            "Next"
          ),
          React.createElement(
            "button",
            null,
            React.createElement("img", { src: "img/twitter-square.png", width: "12px", height: "12px", alt: "" }),
            React.createElement(
              "a",
              { id: "tweet-quote", href: tweet, target: "_blank" },
              " Tweet"
            )
          )
        )
      );
    }
  }]);

  return QuoteMachine;
}(React.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { text: state.text, author: state.author };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getNewQuote: function getNewQuote() {
      dispatch(changeQuote());
    }
  };
};

// reactredux
var Provider = ReactRedux.Provider;
var Container = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);

var Wrapper = function (_React$Component2) {
  _inherits(Wrapper, _React$Component2);

  function Wrapper() {
    _classCallCheck(this, Wrapper);

    return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
  }

  _createClass(Wrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(
        Provider,
        { store: store },
        React.createElement(Container, null)
      );
    }
  }]);

  return Wrapper;
}(React.Component);

function loader() {
  ReactDOM.render(React.createElement(Wrapper, null), document.getElementById("app"));
}