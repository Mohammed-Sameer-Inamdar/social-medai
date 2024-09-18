// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout, setCredentials } from "../slices/auth";

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:3001',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState()?.auth?.token;
//         if (token) {
//             headers.set('authorization', `Bearer ${token}`);
//         }
//         return headers;
//     }
// })

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//     console.log('baseQueryWithReauth result', result);

//     if (result?.error?.status === 403) {
//         console.log('sending refresh token');
//         const refreResult = await baseQuery('/refresh', api, extraOptions);
//         console.log('refreResult', refreResult);
//         if (refreResult?.data) {
//             const { user } = api.getState().auth;
//             api.dispatch(setCredentials({ ...refreResult.data, user }));
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logout());
//         }
//     }
//     return result;
// }

// export const api = createApi({
//     baseQuery: baseQueryWithReauth,
//     endpoints: builder => ({})

// })
