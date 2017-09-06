import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCatPosts, votePost, deletePost } from '../Actions'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

class Category extends Component {

  componentDidMount() {
    this.props.loadPosts(this.props.match.params.category)
  }

  componentWillReceiveProps(nextProps) {
    let nextCategory = nextProps.match.params.category
    if (nextCategory !== this.props.match.params.category) {
      this.props.loadPosts(nextCategory)
    }
  }

  upVotePost = (post) => {
    const POST_ID = post.id
    const value = {
      option: "upVote"
    }
    this.props.votePost(POST_ID, value)
  }

  downVotePost = (post) => {
    const POST_ID = post.id
    const value = {
      option: "downVote"
    }
    this.props.votePost(POST_ID, value)
  }

  removePost = (post) => {
    this.props.deletePost(post.id)
  }

  render() {
    const {posts, history} = this.props

    return (
      <div className="container">
        <h1>{this.props.match.params.category} <small>Posts</small></h1>
          <ul>
            {posts.map((post) => (
              <div key={post.id} style={{marginBottom: "20px"}} className="card">
                <div className="card-block">
                  <h4 className="card-title">{post.title}</h4>
                  <div className="card-subtitle mb-2 text-muted">
                      Posted on <Moment format="YYYY/MM/DD">{post.timestamp}</Moment> by {post.author}
                      <span style={{marginLeft: "10px"}} onClick={this.upVotePost.bind(this, post)}><i className="fa fa-level-up" aria-hidden="true"></i></span>
                        {post.voteScore}
                      <span onClick={this.downVotePost.bind(this, post)}><i className="fa fa-level-down" aria-hidden="true"></i></span>
                  </div>
                  <Link style={{marginBottom: "10px"}} className="btn btn-primary" to={{
                    pathname: "/" + post.category + "/" + post.id
                  }}>Read More &rarr;</Link><br />
                  <Link className="card-link" to={{
                    pathname: `${history.location.pathname}/${post.id}/edit`
                  }}>Edit Post</Link>
                  <span className="card-link" onClick={this.removePost.bind(this, post)}><a>Delete Post</a></span>
                </div>
              </div>
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
      loadPosts: (category) => dispatch(fetchCatPosts(category)),
      votePost: (postId, type) => dispatch(votePost(postId, type)),
      deletePost: (postId) => dispatch(deletePost(postId))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Category)
