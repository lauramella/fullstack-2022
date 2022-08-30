import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Unknown Author',
    url: 'testing.com',
    user: {
      username: 'testuser'
    }
  }

  let testUser = {}

  beforeEach(() => {
    component = render(<Blog blog={blog} user={testUser} />)
  })

  test('renders author and title', () => {
    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(component.container).not.toHaveTextContent('testing.com')
  })

  test('renders extra info when pressing view', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('testing.com')
  })
})