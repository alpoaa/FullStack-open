/* eslint-disable react/prop-types */
const CreateBlog = ({ user, onBlogCreate, newBlogTitle, newBlogAuthor, newBlogUrl, onNewBlogTitleChange, onNewBlogAuthorChange, onNewBlogUrlChange }) => {
    if (!user) {
        return null
    }

    return (
        <form onSubmit={onBlogCreate}>
            <h4>Create new blog</h4>
            <div>
                <input type="text" placeholder="Blog title" value={newBlogTitle} onChange={onNewBlogTitleChange}/>
            </div>
            <div>
                <input type="text" placeholder="Author" value={newBlogAuthor} onChange={onNewBlogAuthorChange}/>
            </div>
            <div>
                <input type="text" placeholder="Url" value={newBlogUrl} onChange={onNewBlogUrlChange}/>
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default CreateBlog