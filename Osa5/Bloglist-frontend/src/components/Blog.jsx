/* eslint-disable react/prop-types */

import { useState } from "react"
import '../styles/blog.css'

const Blog = ({ blog }) => {
    const [viewAll, setViewAll] = useState(false)

    const setShowAllVisibility = () => {
        console.log('blogin nakyvyys: ', blog.title, viewAll)
        setViewAll(!viewAll)
    }

    return (
        <div className="blogmain">
            <div className="blogtitle">
                <p>{blog.title}</p>
                <button onClick={setShowAllVisibility}>{ viewAll ? 'Hide' : 'View' }</button>
            </div>
            {viewAll &&  <div className="blogdetails">
                <p>{blog.author}</p>
                <p>{blog.url}</p>
                <p>{blog.user.name}</p>
            </div>
            }
        </div>
    )
}

export default Blog