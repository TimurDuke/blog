import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imgBbService = createApi({
    reducerPath: 'imgBbService',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.imgbb.com/1/' }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (imageFile) => {
                const formData = new FormData();
                formData.append('image', imageFile);
                return {
                    url: `upload?expiration=60&key=8172ceb7b45d468fd39d0e7ee9dd2743`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const { useUploadImageMutation } = imgBbService;
