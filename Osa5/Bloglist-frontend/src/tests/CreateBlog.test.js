import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Togglable from '../components/Togglable'
import CreateBlog from '../components/CreateBlog'
import testHelper from '../utils/testHelper'

describe('Tests for <CreateBlog /> component', () => {
  let container
  const testUser       = testHelper.testUser
  const createBlogMock = jest.fn()

  beforeEach(() => {
    container = render(<Togglable buttonLabel={testHelper.togglableButtonLabel} show={true}>
      <CreateBlog user={ testUser} createBlog={ createBlogMock }/>
    </Togglable>).container
  })

  test('Creating blog', async() => {
    const user         = userEvent.setup()
    const toggleButton = screen.getByText(testHelper.togglableButtonLabel)

    await user.click(toggleButton)
    expect(container).toBeDefined()

    const createBlogDiv = container.querySelector('.togglableContent')
    expect(createBlogDiv).toBeDefined()

    const titleInput   = screen.getByPlaceholderText('Blog title')
    const authorInput  = screen.getByPlaceholderText('Author')
    const urlInput     = screen.getByPlaceholderText('Url')
    const createButton = screen.getByText('Create')

    await user.type(titleInput, testHelper.createBlogTitleInput)
    await user.type(authorInput, testHelper.createBlogAuthorInput)
    await user.type(urlInput, testHelper.createBlogUrlInput)
    await user.click(createButton)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0].title).toBe(testHelper.createBlogTitleInput)
    expect(createBlogMock.mock.calls[0][0].author).toBe(testHelper.createBlogAuthorInput)
    expect(createBlogMock.mock.calls[0][0].url).toBe(testHelper.createBlogUrlInput)
  })
})