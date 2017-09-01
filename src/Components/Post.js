import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchComments } from '../Actions'
import Moment from 'react-moment';

class Post extends Component {

  componentDidMount() {
    const POST_ID = this.props.match.params.post_id
    this.props.loadPost(POST_ID)
    this.props.loadComments(POST_ID)
  }

  render() {
    console.log(this.props)
    const post = this.props.posts[0]
    const { comments } = this.props
    return(
      <div className="container">
        <div className="blog-post">
          <h2 className="blog-post-title">{post.title}</h2>
          <p className="blog-post-meta"><Moment format="YYYY/MM/DD">{post.timestamp}</Moment> by {post.author}</p>
          <p>{post.body}</p>
        </div>

        {comments.map((comment) => (
          <div className="media mb-4">
            <div className="media-body">
              <h5 className="mt-0">{comment.author}</h5> {comment.body}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: (postId) => dispatch(fetchPost(postId)),
    loadComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
