import React, { useEffect } from 'react'
import { useGetPostsQuery } from '../../slices/postSlice';
import './postlist.css'
import PostExcerpt from './component/PostExcerpt'

const Posts = () => {

    const { data: posts, isError, error, refetch } = useGetPostsQuery('getposts');
    const { data: newestPost } = useGetPostsQuery({
        refetchOnMountOrArgChange: true,
        skip: false
    });

    useEffect(() => {
        if (newestPost) {
            refetch();
        }
    }, [newestPost, refetch]);

    let content;

    const handleRefresh = () => {
        refetch();
    }
    if (posts && posts.ids.length > 0) {
        content = posts.ids.map(id => <PostExcerpt key={id} postId={id} />)

        return (
            <div className='postContainer'>
                <button className='btn btn-primary' onClick={() => handleRefresh()}>Refresh</button>
                {content}
            </div>
        )
    }
    if (isError) {
        return <div className='container'>
            <button className='btn btn-primary' onClick={() => handleRefresh()}>Refresh</button>
            <p>{error}</p>

        </div>
    }

    return (
        <div className='container'>
            <button className='btn btn-primary' onClick={() => handleRefresh()}>Refresh</button>
            <p>No posts</p>
        </div>
    )

}

export default Posts
