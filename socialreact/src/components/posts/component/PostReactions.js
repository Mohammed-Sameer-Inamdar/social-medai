import React from 'react'
import { useUpdatePostMutation } from '../../../slices/postSlice';
import { Spinner } from '../../../icons';

const reactionEmojies = {
    thumsup: '👍',
    wow: '😲',
    heart: '❤',
    rocket: '🚀',
    coffee: '☕'
}

function PostReactions({ post, refetch }) {
    const [updatePost, { isLoading }] = useUpdatePostMutation();
    const onReactionCicked = async (name) => {
        try {
            const newValue = post.reactions[name] + 1;
            await updatePost({ id: post.id, reactions: { ...post.reactions, [name]: newValue } }).unwrap();
            refetch();
        } catch (err) {
            console.log('error on reaction');
        }

    }
    const reactionButtons = Object.entries(reactionEmojies).map(([name, emoji]) => {
        return (
            <button key={name}
                type='button'
                className='icon-btn'
                onClick={() => onReactionCicked(name)}
            >{emoji} {post?.reactions ? post.reactions[name] : 0}</button>
        )
    })
    return <>{reactionButtons} {isLoading && <Spinner />}</>;
}

export default PostReactions    