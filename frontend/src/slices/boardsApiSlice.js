import { apiSlice } from './apiSlice';
const BOARDS_URL = '/api/boards';

export const boardsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBoard: builder.mutation({
            query: (data) => ({
                url: `${BOARDS_URL}/create`,
                method: 'POST',
                body: data
            }),
        }),

        getBoards: builder.query({
            query: () => ({
                url: `${BOARDS_URL}/`,
            })
        })
    })
});

export const {
    useCreateBoardMutation,
    useGetBoardsQuery
} = boardsApiSlice;