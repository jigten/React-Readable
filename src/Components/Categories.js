import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../Actions'

class Categories extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <ul>{this.props.categories.map((category) => (
          <li key={category.name}>{category.name}</li>
      ))}</ul>
    </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
