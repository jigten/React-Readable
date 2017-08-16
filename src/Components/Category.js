import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCatPosts } from '../Actions'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

class Category extends Component {

  componentDidMount() {
    this.props.loadPosts(this.props.match.params.category)
  }

  render() {
    const {posts} = this.props

    return (
      <div className="container">
        <div className="row">
          <h1 class="my-4">{this.props.match.params.category} <small>Posts</small></h1>
          <ul>
            {posts.map((post) => (
              <div key={post.id} className="card mb-4">
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <Link to={{
                    pathname: "/" + post.category + "/" + post.id
                  }}><a className="btn btn-primary">Read More &rarr;</a></Link>
                </div>
                <div className="card-footer text-muted">
                      Posted on <Moment format="YYYY/MM/DD">{post.timestamp}</Moment> by {post.author}
                </div>
              </div>
            ))}
          </ul>
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
      loadPosts: (category) => dispatch(fetchCatPosts(category))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Category)
