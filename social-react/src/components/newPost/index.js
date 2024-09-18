import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../slices/postSlice';

function NewPost() {
    const dispatch = useDispatch();

    const allUsers = useSelector(allUsers);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const renedrUsers = allUsers.map(user => (
        <option key={user.id}>{user.name}</option>
    ))

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'content':
                setContent(e.target.value);
                break;
            case 'userId':
                setUserId(e.target.value)
                break
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            dispatch(createPost(title, content, userId))
            setTitle('')
            setContent('')
        }
    }

    return (
        <section>
            <h2>New Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor='userId'>Author</label>
                <select id='userId' value={userId} name='userId' onChange={handleInputChange} required>
                    {renedrUsers}
                </select>
                <label htmlFor='content'>Content</label>
                <textarea
                    id='content'
                    type='text'
                    name='content'
                    value={content}
                    onChange={handleInputChange}
                    required
                />

                <button type='submit'> Saveś</button>
            </form>
        </section>
    )
}

export default NewPost