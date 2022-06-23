import './App.css';
import React from 'react';
import {PageMain} from './pages/pageMain';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleLogInChange = this.handleLogInChange.bind(this);
    this.state = {
      page: 'main',
      logInStats: {log: false, userName: undefined},
    };
  }

  /**
	 *
	 * @param {a string indicate which page in activated} newPage
	 */
  handlePageChange(newPage) {
    this.setState({page: newPage});
  }

  /**
	 *
	 * @param {a structure including: log(bool), userName} logInStats
	 */
  handleLogInChange(logInStats) {
    this.setState({logInStats: logInStats});
  }

  render() {
    switch (this.state.page) {
      case 'main':
        return (<PageMain
          onPageChange={this.handlePageChange}
          onLogInChange={this.handleLogInChange}
          logInStats={this.state.logInStats}
        />);
        case "signIn":
        	return (<pageSignIn
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "signUp":
        	return (<pageSignUp
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "checked":
        	return (<pageChecked
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "newClaim":
        	return (<pageNewClaim
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "result":
        	return (<pageResult
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "aboutUs":
        	return (<pageAboutUs
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
      default:
        throw new Error('No such page.');
    }
  }
}

export default App;
