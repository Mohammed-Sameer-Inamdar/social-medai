import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialUsers = [{ id: '1', name: 'First user' }];
const userSlice = createSlice({
    name: 'users',
    initialState: initialUsers,
    reducers: {
        addUser: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(name) {
                return {
                    payload: {
                        id: nanoid(),
                        name: name
                    }
                }
            }
        }
    }
})

export const allUsers = (state) => state.users
export const { addUser } = userSlice.actions;
export default userSlice.reducer;