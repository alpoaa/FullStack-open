/* eslint-disable react/prop-types */
import Blog from './Blog'

const BlogsList = ({ user, blogs }) =>  {
    if (!user) {
        return null
    }

    return (
        <div>
            <h4>Blogeja</h4>
            {
                blogs.map(blog => 
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div>
    )
}

export default BlogsList