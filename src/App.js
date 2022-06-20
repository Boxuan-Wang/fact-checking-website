import logo from './logo.svg';
import './App.css';
import React from 'react';

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
	constructor (props) {
		super(props);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.state = {
			page: 'main'
		};
	}

	handlePageChange(newPage) {
		this.setState({page: newPage});
	}

	render() {
		switch (this.state.page) {
			case 'main':
				return (<pageMain 
				onPageChange={this.handlePageChange}/>);
				break;
			case 'signIn':
				return (<pageSignIn 
				onPageChange={this.handlePageChange}/>);
				break;
			case 'signUp':
				return (<pageSignUp 
				onPageChange={this.handlePageChange}/>);
				break;
			case 'checked':
				return (<pageChecked 
				onPageChange={this.handlePageChange}/>);
				break;
			case 'newClaim':
				return (<pageNewClaim 
				onPageChange={this.handlePageChange}/>);
				break;
			case 'result':
				return (<pageResult 
				onPageChange={this.handlePageChange}/>);
				break;
			case 'aboutUs':
				return (<pageAboutUs onPageChange={this.handlePageChange}/>);
				break;
			default:
				throw new Error('No such page.');

		}
	}
}

export default App;
