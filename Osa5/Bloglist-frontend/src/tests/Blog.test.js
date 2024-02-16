import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'
import testHelper from '../utils/testHelper'


describe('Tests for <Blog /> component', () => {
  test('Rendering blog values', () => {
    const testBlog = testHelper.testBlog
    const testUser = testHelper.testUser

    render(<Blog blog={ testBlog } user={ testUser } />)
    const element = screen.getByText(testBlog.title)

    expect(element).toBeDefined()
  })

  test('Show all details when button cliked', async() => {
    const testBlog = testHelper.testBlog
    const testUser = testHelper.testUser

    const { container } = render(<Blog blog={ testBlog } user={ testUser } />)

    const user             = userEvent.setup()
    const visibilityButton = screen.getByText('View')

    await user.click(visibilityButton)

    const blogDetailsDiv = container.querySelector('.blogdetails')

    expect(blogDetailsDiv).toBeDefined()

    const urlElement = screen.getByText(testBlog.url)
    expect(urlElement).toHaveTextContent(testBlog.url)

    const userElement = screen.getByText(testBlog.user.name)
    expect(userElement).toHaveTextContent(testBlog.user.name)

    const likesElement = screen.getByText(`Likes: ${testBlog.likes}`)
    expect(likesElement).toHaveTextContent(`Likes: ${testBlog.likes}`)

  })

})