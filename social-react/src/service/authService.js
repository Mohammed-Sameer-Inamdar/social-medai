import { api } from "../slices/apiSlice";
import { setCredentials } from "../slices/auth";

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            async onQueryStarted({ username, password }, { dispatch, queryFulfilled }) {

                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ user: data.user, token: data.token }));
                } catch (err) {
                    console.log('error', err);
                    dispatch(setCredentials({ user: null, token: null }));
                }
            }
        }),
        signup: builder.mutation({
            query: data => ({
                url: '/signup',
                method: 'POST',
                body: { ...data }
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation } = authApi;