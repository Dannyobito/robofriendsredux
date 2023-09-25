import React, {Component} from "react";
import { connect } from "react-redux";
import CardList from "./CardList";
import './App.css'
import SearchBox from './SearchBox.js'
import { setSearchField, requestRobots } from "./actions";

const mapStateToProps = state => {
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}
const mapDispatchToProps = (dispatch)=>{
   return{
     onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
     onRequestRobots: () => dispatch(requestRobots())
   }
}
class App extends Component {
    
    componentDidMount(){
        this.props.onRequestRobots();
         }
    
    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props
        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ? 
        <div className="tc"><h1 className="f1">Loading</h1></div> :
        (
            <div className="tc">
                <h1 className="f1">Robofriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <CardList robots={filteredRobots}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);