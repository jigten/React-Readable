import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../Actions/post'
import { fetchCategories } from '../Actions/category'

class PostsNew extends Component {

  componentDidMount() {
    this.props.loadCategories()
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

  renderSelect = (field) => {
    const { meta: { touched, error } } = field
    const { categories } = this.props
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <select
          className="form-control"
          {...field.input}>
          <option></option>
           {categories.map((category) =>
             <option key={category.name} value={category.name}>{category.name}</option>
           )}
        </select>
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit = (values) => {
    values['id'] = Math.random().toString(36).substr(-8)
    values['timestamp'] = Date.now()
    this.props.savePost(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
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
          <Field
            label="Author"
            name="author"
            component={this.renderField}
          />
          <Field
            label="Category"
            name="category"
            component={this.renderSelect}
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

  if (!values.title) {
    errors.title = "Enter a title!"
  }

  if(!values.body) {
    errors.body = "Please enter some content!"
  }

  if(!values.author) {
    errors.author = "Please enter your username!"
  }


  if(!values.category) {
    errors.category = "Please select a category!"
  }

  return errors
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    savePost: (post, callback) => dispatch(createPost(post, callback))
  }
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, mapDispatchToProps)(PostsNew)
)
