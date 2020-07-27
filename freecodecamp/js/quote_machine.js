const QUOTES = [
  {
    text: "But man is not made for defeat. A man can be destroyed but not defeated.",
    author: "Earnest Hemmingway"
  },
  {
    text: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "It is better to be feared than loved, if you cannot be both.",
    author: "Niccolo Machiavelli"
  },
  {
    text: "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night.",
    author: "William Blake"
  },
  {
    text: "No act of kindness, no matter how small, is ever wasted.",
    author: "Aesop"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  }
]

// redux 

// action types
const CHANGE = "CHANGE_QUOTE";
// actions

function changeQuote() {
  let x = Math.floor(Math.random() * QUOTES.length);
  return {
    type: CHANGE,
    text: QUOTES[x].text,
    author: QUOTES[x].author
  }
}

// Reducer

function quoteReducer(state = [], action) {
  switch(action.type) {
    case CHANGE:
      return { text: action.text, author: action.author };
    default:
      return state;
  }
}

const store = Redux.createStore(quoteReducer);

// react

class QuoteMachine extends React.Component {
  
  constructor(props) {
    super(props);
    this.switchQuote = this.switchQuote.bind(this);
  }

  componentDidMount() {
    // if it was going to be empty, we have to prevent that
    if(this.props.quote === undefined) {
      this.props.getNewQuote();
    }
  }

  switchQuote () {
    this.props.getNewQuote();
  }

  render () {
    const tweet = "https://twitter.com/intent/tweet?text=" +  this.props.text + " – " + this.props.author;
    return (
      <div id="quote-box">
        <h2 id="text">{this.props.text}</h2>
        <h4 id="author">– {this.props.author}</h4>
        <div id="button-box">
          <button id="new-quote" onClick={this.switchQuote}>Next</button>
          <button>
          <img src="img/twitter-square.png" width="12px" height="12px" alt=""></img>
          <a id="tweet-quote" href={tweet} target="_blank"> Tweet</a>
          </button>
        </div>
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {text: state.text, author: state.author};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNewQuote: () => {
      dispatch(changeQuote());
    }
  }
}

// reactredux
const Provider = ReactRedux.Provider;
const Container = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);

class Wrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}


function loader() {
  ReactDOM.render(<Wrapper />,document.getElementById("app"));
}