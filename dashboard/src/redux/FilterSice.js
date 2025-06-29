import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGroups = createAsyncThunk("fetchGroups", async () => {
  const rsl = await axios.get(
    "https://api.coachfinder.app/api/v1/groups"
  );
  let res = await rsl.data;

  return res.data.data;

});

export const searchFeatch = createAsyncThunk("searchFeatch", async (name) => {
  console.log(name);

  const rsl = await axios.get(
    `https://api.coachfinder.app/api/v1/groups?search=${name}`
  );
  let res = await rsl.data;

  if (res.data.data.length == 0) {
    return [];
  } else {
    return res.data.data;
  }

});


export const FilterSlice = createSlice({
  name: "FilterSlice",
  initialState: {
    dataInfo: [],
    isLoading: false,
    isError: false,
    searchData: null,
    toastName: "Torque",
    tableData: []
  },

  reducers: {
    toastFunc: (state, action) => {
      state.toastName = action.payload;
    },
    sortFunc: (state, action) => {
      switch (action.payload) {
        case "A-Z":
          state.dataInfo = state.dataInfo.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });

          break;

        case "Z-A":
          state.dataInfo = state.dataInfo.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });

          break;

        case "Ascending":
          state.dataInfo = state.dataInfo.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          });

          break;

        case "Descending":
          state.dataInfo = state.dataInfo.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          break;

        default:
          break;
      }
    },
    deleteUpdate: (state, action) => {
      state.dataInfo = state.dataInfo.filter(
        (item) => !action.payload.includes(item._id)
      );
    },
    getTable: (state, action) => {
      state.tableData = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataInfo = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });

    // searchFeatch start
    builder
      .addCase(searchFeatch.pending, (state, action) => {
        state.searchData = "loadding";
      })
      .addCase(searchFeatch.fulfilled, (state, action) => {
        state.dataInfo = action.payload;
      })
      .addCase(searchFeatch.rejected, (state, action) => {
        state.searchData = action.payload;
      });
    // searchFeatch end
  },
});

// Action creators are generated for each case reducer function
export const { toastFunc, sortFunc, deleteUpdate, getTable } = FilterSlice.actions;

export default FilterSlice.reducer;
