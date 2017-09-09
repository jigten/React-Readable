import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchComment, editComment } from '../Actions'

class EditPost extends Component {

  componentDidMount() {
    this.props.loadComment(this.props.match.params.comment_id)
  }

  renderField = (field) => {
    console.log(this.props)
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
    const { comment } = this.props
    values['timestamp'] = Date.now()
    this.props.updateComment(comment.id, values, () => {
      this.props.history.goBack()
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>

          <Field
            label="Body"
            name="body"
            component={this.renderField}
          />

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}


function validate(values) {
  const errors = {}

  if(!values.body) {
    errors.body = "Please enter some content!"
  }

  return errors
}

function mapStateToProps({ comments }) {
  return {
    comment: comments[0]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComment: (commentId) => dispatch(fetchComment(commentId)),
    updateComment: (id, post, callback) => dispatch(editComment(id, post, callback))
  }
}

export default reduxForm({
  validate,
  form: 'EditCommentForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(
  connect(mapStateToProps, mapDispatchToProps)(EditPost)
)
