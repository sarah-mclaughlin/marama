import React from 'react'
import { Link } from 'react-router-dom'
import { getType } from '../actions/type.js'
import { connect } from 'react-redux'

class Interest extends React.Component {
  componentDidMount () {
    this.props.dispatch(getType(this.props.match.params.interest))
  }

  render () {
    return (
      <div className='page-section'>
        <div className='interest-section'>
          <div className='page-title-font'>{this.props.match.params.interest}</div>
          {this.props.interestType.map(type => (
            <div key={type.type_id}>
              <Link to={`/interests/${this.props.match.params.interest}/${type.name}`}>
                <div className='p-class'>{type.name}</div>
              </Link>
              <div>
                <div className='p-class'>{type.description}</div>
              </div>
            </div>
          )
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    interestType: state.interestType
  }
}

export default connect(mapStateToProps)(Interest)
