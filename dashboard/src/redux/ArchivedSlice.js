import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios.config";

export const fetchArchived = createAsyncThunk("fetchArchived", async () => {
    const res = await axiosInstance.get('/groups?archived=true');
    const data = res.data.data;
    return data

});

export const ArchivedSlice = createSlice({
    name: "ArchivedSlice",
    initialState: {
        ArchiveInfo: [],
        ArchiveFilter: [],
        isLoading: false,
        isError: false,
    },

    reducers: {
        deleteArived: (state, action) => {
            state.ArchiveInfo = state.ArchiveInfo.filter(
                (item) => !action.payload.includes(item._id)
            );
            state.ArchiveFilter = state.ArchiveFilter.filter(
                (item) => !action.payload.includes(item._id)
            );
        },
        sortFuncArchive: (state, action) => {
            switch (action.payload) {
                case "A-Z":
                    state.ArchiveInfo = state.ArchiveInfo.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    });

                    break;

                case "Z-A":
                    state.ArchiveInfo = state.ArchiveInfo.sort((a, b) => {
                        return b.name.localeCompare(a.name);
                    });

                    break;

                case "Ascending":
                    state.ArchiveInfo = state.ArchiveInfo.sort((a, b) => {
                        return new Date(a.createdAt) - new Date(b.createdAt);
                    });

                    break;

                case "Descending":
                    state.ArchiveInfo = state.ArchiveInfo.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });

                    break;

                default:
                    break;
            }
        },
        searchArchive: (state, action) => {
            state.ArchiveInfo = state.ArchiveFilter.filter((el) => el.name.toLowerCase().startsWith(action.payload.toLowerCase()))
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchArchived.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArchived.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ArchiveInfo = action.payload;
                state.ArchiveFilter = action.payload;
            })
            .addCase(fetchArchived.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            });
    },
});

// Action creators are generated for each case reducer function
export const { deleteArived, sortFuncArchive, searchArchive } = ArchivedSlice.actions;

export default ArchivedSlice.reducer;
