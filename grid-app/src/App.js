import React, {Component} from 'react'
import './App.css';
import ButtonAppBar from './ButtonAppBar'
import TitlebarGridList from './Cards'
//import MyButton from './Footer'

class App extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
        <TitlebarGridList />
        {/* <MyButton/> */}
      </div>
    );
  }
}

export default App;