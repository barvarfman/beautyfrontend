import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomePage.scss';


class _HomePage extends Component {
    state = {
     
    }
     componentDidMount() {
       
    }
    render() {
    
        return (
            <main className="home-page">
               
                <Link to="/">
                </Link>
            </main>
        )
    }
}

function mapStateProps(state) {
    return {
       
    }
}

const mapDispatchToProps = {
  
}

export const HomePage = connect(mapStateProps, mapDispatchToProps)(_HomePage)
