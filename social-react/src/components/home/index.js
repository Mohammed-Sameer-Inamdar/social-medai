import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../slices/auth'

const HomePage = () => {
    const user = useSelector(selectCurrentUser);

    return (
        <section>
            <h1 className='p-6 bg-black'>Welcom {user?.userName ?? ""}</h1>
        </section>
    )
}

export default HomePage