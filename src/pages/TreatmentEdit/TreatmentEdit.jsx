import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { saveContact, loadContacts } from '../../actions/ContactActions';
// import { contactService } from '../../services/contact.service'
// import { Link } from 'react-router-dom'
import './TreatmentEdit.scss'
import {withRouter} from 'react-router-dom';
class _TreatmentEdit extends Component {
    videoUrl = '';
    state = {

    }

    componentDidMount() {
        this.props.history.goBack();
    }
    handleChange = ({ target }) => {
        this.videoUrl = target.value
    }

    render() {
        return (
            <form onSubmit={this.updateState}>
                <input type="text" name="name" onChange={this.handleChange} placeholder="Enter Youtube Url..." />
            </form>
        )
    }
}


function mapStateProps(state) {
    return {

    }
}

const mapDispatchToProps = {

}
export const TreatmentEdit = withRouter(connect(mapStateProps, mapDispatchToProps)(_TreatmentEdit))
// export const TreatmentEdit = connect(mapStateProps, mapDispatchToProps)(_TreatmentEdit)