var defaultText = "# Welcome to my React Markdown Previewer!\r\n\r\n## This is a sub-heading...\r\n### And here\'s some other cool stuff:\r\n  \r\nHeres some code, `<div><\/div>`, between 2 backticks.\r\n\r\n```\r\n\/\/ this is multi-line code:\r\n\r\nfunction anotherExample(firstLine, lastLine) {\r\n  if (firstLine == \'```\' && lastLine == \'```\') {\r\n    return multiLineCode;\r\n  }\r\n}\r\n```\r\n  \r\nYou can also make text **bold**... whoa!\r\nOr _italic_.\r\nOr... wait for it... **_both!_**\r\nAnd feel free to go crazy ~~crossing stuff out~~.\r\n\r\nThere\'s also [links](https:\/\/www.freecodecamp.com), and\r\n> Block Quotes!\r\n\r\nAnd if you want to get really crazy, even tables:\r\n\r\nWild Header | Crazy Header | Another Header?\r\n------------ | ------------- | ------------- \r\nYour content can | be here, and it | can be here....\r\nAnd here. | Okay. | I think we get it.\r\n\r\n- And of course there are lists.\r\n  - Some are bulleted.\r\n     - With different indentation levels.\r\n        - That look like this.\r\n\r\n\r\n1. And there are numbererd lists too.\r\n1. Use just 1s if you want! \r\n1. But the list goes on...\r\n- Even if you use dashes or asterisks.\r\n* And last but not least, let\'s not forget embedded images:\r\n\r\n![React Logo w\/ Text](https:\/\/goo.gl\/Umyytc)\r\n";

const initialState = {
  editText: defaultText,
  markText: marked(defaultText)
};

// action types

const UPDATE_TEXT = "UPDATE_TEXT" // update text

// action handler

function updateText(textToUpdate) {
  return ({type: UPDATE_TEXT, text: textToUpdate})
}

// reducers

function textReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_TEXT:
      return ({ editText: action.text, markText: marked(action.text) })
    default:
      return state;
  }
}

const store = Redux.createStore(textReducer);

// react
class TextToMarkdown extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.getElementById("preview").innerHTML = this.props.markText;
  }

  componentDidUpdate() {
    document.getElementById("preview").innerHTML = this.props.markText;
  }

  handleChange() {
    this.props.doTextUpdate();
  }

  render() {
    return (
      <div id="container">
        <div id="edit">
          <div id="edit-head"><h4>Editor</h4></div>
          <textarea id="editor" value={this.props.editText} onChange={this.handleChange}></textarea>
        </div>

        <div id="markdown">
          <div id="markdown-head"><h4>Markdown Preview</h4></div>
          <div id="preview"></div>
        </div>
      </div>
    )
  }
}

// react-redux
const textMapStateToProps = (state) => ({ editText: state.editText, markText: state.markText });

const textMapDispatchToProps = (dispatch) =>{
  return ({ doTextUpdate: () => dispatch(updateText(document.getElementById("editor").value))})
}

const Provider = ReactRedux.Provider;
const Container = ReactRedux.connect(textMapStateToProps, textMapDispatchToProps)(TextToMarkdown);

class Wrapper extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

function loader() {
  // any initializations
  marked.setOptions({breaks: true}); // interpret \r as <br>
  ReactDOM.render(<Wrapper />, document.getElementById('app'));
}