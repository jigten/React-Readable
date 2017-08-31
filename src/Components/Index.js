import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../Actions'
import { Link } from 'react-router-dom'

class Index extends Component {

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  render() {
    const { categories, posts } = this.props

    return (
      <div className="container">

        <div className="test-xs-right">
          <Link className="btn btn-primary" to="/post/new">
            Add a Post
          </Link>
        </div>

        <ul>{categories.map((category) => (
          <li key={category.name}><Link to={{
            pathname: "/" + category.path
          }}>{category.name}</Link></li>
      ))}</ul>

        <ul>{posts.map((post) => (
          <li key={post.id}>
            {post.title}: {post.body} CATEGORY: {post.category}
          </li>
        ))}</ul>
    </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    loadPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
