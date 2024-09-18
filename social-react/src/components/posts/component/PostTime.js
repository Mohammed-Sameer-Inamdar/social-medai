import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react'

function PostTime({ timestamp }) {
    let timeAgo = '';
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`
    }
    return (
        <span title={timestamp}>
            🕒 {timeAgo}
        </span>
    )
}

export default PostTime