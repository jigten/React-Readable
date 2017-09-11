import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editPost, fetchPost } from '../Actions/post'

class EditPost extends Component {

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.post_id)
  }

  renderField = (field) => {
    const { post } = this.props
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          value={post.title}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit = (values) => {
    const { post } = this.props
    this.props.editPost(post.id, values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const post = this.props.post
    const { handleSubmit } = this.props

    return (
      <div>
      {post && Object.keys(post).length !== 0 ? (
        <div className="container">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              label="Title"
              name="title"
              component={this.renderField}
            />

            <Field
              label="Body"
              name="body"
              component={this.renderField}
            />

            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </form>
        </div>
      ) : (
        <h2>
          404: Cannot find that post. Please try again.
        </h2>
      )}
      </div>
    )
  }
}


function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = "Enter a title!"
  }

  if(!values.body) {
    errors.body = "Please enter some content!"
  }

  return errors
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[0]
  }
}

export default reduxForm({
  validate,
  form: 'PostsEditForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(
  connect(mapStateToProps, {fetchPost, editPost})(EditPost)
)
