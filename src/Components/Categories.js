import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../Actions'
import { Link } from 'react-router-dom'

class Categories extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <div>
        <ul>{this.props.categories.map((category) => (
          <li key={category.name}><Link to={{
            pathname: "/" + category.path,
            state: { category: category.name }
          }}>{category.name}</Link></li>
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
