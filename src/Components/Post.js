import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../Actions'
import Moment from 'react-moment';

class Post extends Component {

  componentDidMount() {
    const POST_ID = this.props.match.params.post_id
    this.props.loadPost(POST_ID)
  }

  render() {
    const post = this.props.posts[0]
    console.log(post)

    return(
      <div className="container">
        <div className="row">
          <h1 className="mt-4">{post.title}</h1>
          <p className="lead">
            by {post.author}
          </p>
          <hr />
          <p><Moment format="YYYY/MM/DD">{post.timestamp}</Moment></p>
          <hr />
          <p className="lead">{post.body}</p>
        </div>
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
