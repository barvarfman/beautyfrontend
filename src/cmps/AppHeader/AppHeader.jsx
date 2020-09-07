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
<<<<<<< HEAD
    stam ma
=======
   Dolev Header
>>>>>>> 1938009c0e0e11f188987c7f8a76943153d67c5a
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
