import './App.css';
import React from 'react';
import { PageMain } from './pages/pageMain';
import { PageNewClaim } from "./pages/pageNewClaim";
import { PageChecked } from "./pages/pageChecked";
import { PageSignIn } from "./pages/pageSignIn";
import { PageSignUp } from "./pages/pageSignUp";
import { PageResult } from "./pages/pageResult";
import { PageAboutUs} from "./pages/pageAboutUs";

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
        	return (<PageSignIn
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "signUp":
        	return (<PageSignUp
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "checked":
        	return (<PageChecked
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "newClaim":
        	return (<PageNewClaim
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "result":
        	return (<PageResult
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
        case "aboutUs":
        	return (<PageAboutUs
        	onPageChange={this.handlePageChange}
        	onLogInChange={this.handleLogInChange}
        	logInStats={this.state.logInStats}/>);
      default:
        throw new Error('No such page.');
    }
  }
}

export default App;
