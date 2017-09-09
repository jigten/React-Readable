import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostShow, fetchComments, votePost, createComment, voteComment, deleteAPost, deleteComment } from '../Actions'
import Moment from 'react-moment';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

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
    this.props.votePost(POST_ID, value)
  }

  downVotePost = () => {
    const POST_ID = this.props.match.params.post_id
    const value = {
      option: "downVote"
    }
    this.props.votePost(POST_ID, value)
  }

  upVoteComment = (comment) => {
    const COMMENT_ID = comment.id
    const value = {
      option: "upVote"
    }
    this.props.voteComment(COMMENT_ID, value)
  }

  downVoteComment = (comment) => {
    const COMMENT_ID = comment.id
    const value = {
      option: "downVote"
    }
    this.props.voteComment(COMMENT_ID, value)
  }

  renderField = (field) => {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit = (values) => {
    values['id'] = Math.random().toString(36).substr(-8)
    values['timestamp'] = Date.now()
    values['parentId'] = this.props.posts[0].id
    this.props.createComment(values)
  }

  removePost = () => {
    const POST_ID = this.props.match.params.post_id
    this.props.deletePost(POST_ID, () => {
      this.props.history.goBack()
    })
  }

  deleteComment = (comment) => {
    this.props.removeComment(comment.id)
  }

  render() {
    const post = this.props.posts[0]
    const { comments, history } = this.props
    const { handleSubmit } = this.props

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
              <span style={{ marginRight: "5px" }} onClick={this.upVotePost}><i className="fa fa-level-up" aria-hidden="true"></i></span>
                {post.voteScore}
              <span style={{ marginLeft: "5px" }} onClick={this.downVotePost}><i className="fa fa-level-down" aria-hidden="true"></i></span>
              <i style={{ marginLeft: "30px" }} className="fa fa-comments" aria-hidden="true"></i> {comments.length}
            </p>
            <Link className="card-link" to = {{
              pathname: `${history.location.pathname}/edit`
            }}>Edit Post</Link>
            <span className="card-link" onClick={this.removePost}><a>Delete Post</a></span>
          </div>
          <div className="container">
            <div className="comments">
              <h3 className="mb-2">Comments</h3>
              <form style={{ paddingBottom: "20px" }} onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                  label="Author"
                  name="author"
                  component={this.renderField}
                />
                <Field
                  label="Body"
                  name="body"
                  component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-content">
                    <h6 className="small comment-meta">
                      {comment.author}
                      <Moment style={{ marginLeft: "5px" }} format="YYYY/MM/DD">{comment.timestamp}</Moment>
                      <span style={{ marginRight: "5px", marginLeft: "10px" }} onClick={this.upVoteComment.bind(this, comment)}><i className="fa fa-level-up" aria-hidden="true"></i></span>
                        {comment.voteScore}
                      <span style={{ marginLeft: "5px", marginRight: "10px" }} onClick={this.downVoteComment.bind(this, comment)}><i className="fa fa-level-down" aria-hidden="true"></i></span>
                      <Link to={{
                        pathname: `${history.location.pathname}/comments/${comment.id}/edit`
                      }}>Edit</Link>
                      <span style={{marginLeft: "10px"}} onClick={this.deleteComment.bind(this, comment)}>Delete</span>
                    </h6>
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

function validate(values) {
  const errors = {}

  if(!values.author) {
    errors.author = "Please enter your username!"
  }

  if(!values.body) {
    errors.body = "Please enter some content!"
  }

  return errors
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: (postId) => dispatch(fetchPostShow(postId)),
    loadComments: (postId) => dispatch(fetchComments(postId)),
    votePost: (postId, type) => dispatch(votePost(postId, type)),
    createComment: (comment) => dispatch(createComment(comment)),
    voteComment: (commentId, type) => dispatch(voteComment(commentId, type)),
    deletePost: (postId, callback) => dispatch(deleteAPost(postId, callback)),
    removeComment: (commentId) => dispatch(deleteComment(commentId))
  }
}

export default reduxForm({
  validate,
  form: 'CommentsNewForm'
})(
  connect(mapStateToProps, mapDispatchToProps)(Post)
)
