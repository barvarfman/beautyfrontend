import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './AppHeader.scss';
 class _AppHeader extends React.Component {
    state = {
      
    }
   

   componentDidMount() {
       
    }
    render() {
        return (
            <header className="app-header">
    stam masheo
            </header>
        )
    }
}


function mapStateProps(state) {
    return {
       
    }
}

const mapDispatchToProps = {
 
}

export const AppHeader = withRouter(connect(mapStateProps, mapDispatchToProps)(_AppHeader))
