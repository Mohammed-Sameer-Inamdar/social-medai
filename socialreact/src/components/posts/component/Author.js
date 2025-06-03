import React from 'react'

const Author = ({ author }) => {
    return (
        <span style={{ textTransform: 'capitalize' }}>by {author?.username ?? 'Unknow Author'}</span>
    )
}

export default Author