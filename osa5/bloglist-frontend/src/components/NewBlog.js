import { useState } from 'react'

const NewBlog = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleCreate(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            id='title'
            type="text"
            value={title}
            aria-label='title'
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="author"
            value={author}
            aria-label='author'
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="url"
            value={url}
            aria-label="url"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-button' type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlog