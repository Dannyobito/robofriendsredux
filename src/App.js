import React, {Component} from "react";
import { connect } from "react-redux";
import CardList from "./CardList";
import './App.css'
import SearchBox from './SearchBox.js'
import { setSearchField } from "./actions";

const mapStateToProps = state => {
    return{
        searchfield: state.searchRobots.searchField
    }
}
const mapDispatchToProps = (dispatch)=>{
   return{
     onSearchChange: (event) => dispatch(setSearchField(event.target.value))
   }
}
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
            ,
        }
    }
    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users/")
        .then(response => {
           return response.json();
        })
        .then(
            users => {
                this.setState({robots:users})
            }
        )
        }
    onSearchChange = (event) => {
        this.setState(
            {searchfield:event.target.value});
    }
    render() {
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return (
            <div className="tc">
                <h1 className="f1">Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <CardList robots={filteredRobots}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);