import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCatPosts, votePost } from '../Actions'
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
    this.props.votePost(POST_ID, value, () => {
      this.props.loadPosts(this.props.match.params.category)
    })
  }

  downVotePost = (post) => {
    const POST_ID = post.id
    const value = {
      option: "downVote"
    }
    this.props.votePost(POST_ID, value, () => {
      this.props.loadPosts(this.props.match.params.category)
    })
  }

  render() {
    const {posts} = this.props

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
                  <a href="#" style={{paddingRight: "20px"}}class="card-link">Edit Post</a>
                  <a href="#" class="card-link">Delete Post</a>
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
      votePost: (postId, type, callback) => dispatch(votePost(postId, type, callback))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Category)
