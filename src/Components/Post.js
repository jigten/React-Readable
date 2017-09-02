import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchComments, votePost } from '../Actions'
import Moment from 'react-moment';

class Post extends Component {

  componentDidMount() {
    const POST_ID = this.props.match.params.post_id
    this.props.loadPost(POST_ID)
    this.props.loadComments(POST_ID)
  }

  upVotePost = () => {
    const POST_ID = this.props.match.params.post_id
    const value = {
      option: "upVote"
    }
    this.props.votePost(POST_ID, value, () => {
      this.props.loadPost(POST_ID)
    })
  }

  downVotePost = () => {
    const POST_ID = this.props.match.params.post_id
    const value = {
      option: "downVote"
    }
    this.props.votePost(POST_ID, value, () => {
      this.props.loadPost(POST_ID)
    })
  }

  render() {
    console.log(this.props)
    const post = this.props.posts[0]
    const { comments } = this.props
    return(
        <div style={{ paddingTop: "20px" }} className="container">
          <div className="blog-post">
            <h2 className="blog-post-title">{post.title}</h2>
            <p className="blog-post-meta"><Moment format="YYYY/MM/DD">{post.timestamp}</Moment> by {post.author}</p>
          <hr />
            <div className="card-body">
              <p>{post.body}</p>
            </div>
            <hr />
            <p className="blog-post-meta">
              <span onClick={this.upVotePost}><i className="fa fa-level-up" aria-hidden="true"></i></span>
                {post.voteScore}
              <span onClick={this.downVotePost}><i className="fa fa-level-down" aria-hidden="true"></i></span>
            </p>
          </div>
          <div className="container">
            <div className="comments">
              <h3 className="mb-2">Comments</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-content">
                    <h6 className="small comment-meta">{comment.author} <Moment format="YYYY/MM/DD">{comment.timestamp}</Moment></h6>
                    <div className="comment-body">
                      <p>{comment.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
    loadComments: (postId) => dispatch(fetchComments(postId)),
    votePost: (postId, type, callback) => dispatch(votePost(postId, type, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
