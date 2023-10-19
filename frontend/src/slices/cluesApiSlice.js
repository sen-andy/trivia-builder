import { apiSlice } from './apiSlice';
const CLUE_URL = '/api/clues';

export const cluesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createClue: builder.mutation({
            query: (data) => ({
                url: `${CLUE_URL}/create`,
                method: 'POST',
                body: data
            }),
        }),

        getClues: builder.query({
            query: () => ({
                url: `${CLUE_URL}/`,
            })
        })
    })
});

export const {
    useCreateClueMutation,
    useGetCluesQuery
} = cluesApiSlice;