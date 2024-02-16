import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import testHelper from '../utils/testHelper'


describe('Tests for <Blog /> component', () => {
  test('Rendering blog values', () => {
    const blog = testHelper.testBlog
    const user = testHelper.testUser

    render(<Blog blog={ blog } user={ user } />)
    const element = screen.getByText(blog.title)

    expect(element).toBeDefined()
  })
})