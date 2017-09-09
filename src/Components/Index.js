import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, votePost, deletePost } from '../Actions'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

class Index extends Component {

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPosts()
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
    const { categories, posts } = this.props
    const postsArr = posts.filter(post => post.deleted !== true)

    return (
      <div style={{marginTop: "20px"}} className="container">
        {postsArr.map((post) => (
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
              {/* <Link className="card-link" to={{
                pathname: `${history.location.pathname}/${post.id}/edit`
              }}>Edit Post</Link> */}
              <span className="card-link" onClick={this.removePost.bind(this, post)}><a>Delete Post</a></span>
            </div>
          </div>
        ))}
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
    loadPosts: () => dispatch(fetchPosts()),
    votePost: (postId, type) => dispatch(votePost(postId, type)),
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
