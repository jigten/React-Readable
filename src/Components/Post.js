import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../Actions'

class Post extends Component {

  componentDidMount() {
    const POST_ID = this.props.location.state.post_id
    this.props.loadPost(POST_ID)
  }

  render() {
    const post = this.props.posts[0]

    return(
      <div>
        <h3>{post.title}</h3>
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
    loadPost: (postId) => dispatch(fetchPost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
