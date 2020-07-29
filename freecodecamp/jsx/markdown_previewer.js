var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultText = "# Welcome to my React Markdown Previewer!\r\n\r\n## This is a sub-heading...\r\n### And here\'s some other cool stuff:\r\n  \r\nHeres some code, `<div><\/div>`, between 2 backticks.\r\n\r\n```\r\n\/\/ this is multi-line code:\r\n\r\nfunction anotherExample(firstLine, lastLine) {\r\n  if (firstLine == \'```\' && lastLine == \'```\') {\r\n    return multiLineCode;\r\n  }\r\n}\r\n```\r\n  \r\nYou can also make text **bold**... whoa!\r\nOr _italic_.\r\nOr... wait for it... **_both!_**\r\nAnd feel free to go crazy ~~crossing stuff out~~.\r\n\r\nThere\'s also [links](https:\/\/www.freecodecamp.com), and\r\n> Block Quotes!\r\n\r\nAnd if you want to get really crazy, even tables:\r\n\r\nWild Header | Crazy Header | Another Header?\r\n------------ | ------------- | ------------- \r\nYour content can | be here, and it | can be here....\r\nAnd here. | Okay. | I think we get it.\r\n\r\n- And of course there are lists.\r\n  - Some are bulleted.\r\n     - With different indentation levels.\r\n        - That look like this.\r\n\r\n\r\n1. And there are numbererd lists too.\r\n1. Use just 1s if you want! \r\n1. But the list goes on...\r\n- Even if you use dashes or asterisks.\r\n* And last but not least, let\'s not forget embedded images:\r\n\r\n![React Logo w\/ Text](https:\/\/goo.gl\/Umyytc)\r\n";

var initialState = {
  editText: defaultText,
  markText: marked(defaultText)
};

// action types

var UPDATE_TEXT = "UPDATE_TEXT"; // update text

// action handler

function updateText(textToUpdate) {
  return { type: UPDATE_TEXT, text: textToUpdate };
}

// reducers

function textReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case UPDATE_TEXT:
      return { editText: action.text, markText: marked(action.text) };
    default:
      return state;
  }
}

var store = Redux.createStore(textReducer);

// react

var TextToMarkdown = function (_React$Component) {
  _inherits(TextToMarkdown, _React$Component);

  function TextToMarkdown(props) {
    _classCallCheck(this, TextToMarkdown);

    var _this = _possibleConstructorReturn(this, (TextToMarkdown.__proto__ || Object.getPrototypeOf(TextToMarkdown)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(TextToMarkdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementById("preview").innerHTML = this.props.markText;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      document.getElementById("preview").innerHTML = this.props.markText;
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      this.props.doTextUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
          "div",
          { id: "edit" },
          React.createElement(
            "div",
            { id: "edit-head" },
            React.createElement(
              "h4",
              null,
              "Editor"
            )
          ),
          React.createElement("textarea", { id: "editor", value: this.props.editText, onChange: this.handleChange })
        ),
        React.createElement(
          "div",
          { id: "markdown" },
          React.createElement(
            "div",
            { id: "markdown-head" },
            React.createElement(
              "h4",
              null,
              "Markdown Preview"
            )
          ),
          React.createElement("div", { id: "preview" })
        )
      );
    }
  }]);

  return TextToMarkdown;
}(React.Component);

// react-redux


var textMapStateToProps = function textMapStateToProps(state) {
  return { editText: state.editText, markText: state.markText };
};

var textMapDispatchToProps = function textMapDispatchToProps(dispatch) {
  return { doTextUpdate: function doTextUpdate() {
      return dispatch(updateText(document.getElementById("editor").value));
    } };
};

var Provider = ReactRedux.Provider;
var Container = ReactRedux.connect(textMapStateToProps, textMapDispatchToProps)(TextToMarkdown);

var Wrapper = function (_React$Component2) {
  _inherits(Wrapper, _React$Component2);

  function Wrapper(props) {
    _classCallCheck(this, Wrapper);

    return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));
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
  // any initializations
  marked.setOptions({ breaks: true }); // interpret \r as <br>
  ReactDOM.render(React.createElement(Wrapper, null), document.getElementById('app'));
}