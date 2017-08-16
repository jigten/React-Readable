import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCatPosts } from '../Actions'
import { Link } from 'react-router-dom'

class Category extends Component {

  componentDidMount() {
    this.props.loadPosts(this.props.location.state.category)
  }

  render() {
    const {posts} = this.props

    return (
      <div className="container">
        <ul>
          {posts.map((post) => (
            <li key={post.id}><Link to={{
              pathname: "/" + post.category + "/" + post.id,
              state: { post_id: post.id }
            }}>{post.title} : {post.body}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}


  function mapStateToProps({ posts }) {
    return {
      posts
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      loadPosts: (category) => dispatch(fetchCatPosts(category))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Category)
