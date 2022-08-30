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

  const mockUser = {}
  const mockLikeHandle = jest.fn()


  beforeEach(() => {
    component = render(<Blog blog={blog} user={mockUser} handleLike={mockLikeHandle} />)
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

  test('Event handler is called twice when clicking like button twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockLikeHandle.mock.calls).toHaveLength(2)
  })

})