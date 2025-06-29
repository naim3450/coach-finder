import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGroups = createAsyncThunk("fetchGroups", async () => {
  const rsl = await axios.get("https://api.coachfinder.app/api/v1/groups");
  let res = await rsl.data;
  return res.data.data;
});

export const searchFeatch = createAsyncThunk("searchFeatch", async (name) => {
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

let compareVal = [];
if (typeof window !== "undefined") {
  compareVal = JSON.parse(localStorage.getItem("compareData"));
}

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    dataInfo: [],
    filterInfo: [],
    isLoading: false,
    isError: false,
    quizArr: [],
    createAccount: {},
    hitQuiz: false,
    forgetStatus: false,
    emailForFGP: false,
    tOtpForFGP: false,
    otpStatusValid: false,
    sucessfully: false,
    compareVal: [],
    searchLoading: false,
  },

  reducers: {
    margeObject: (state, action) => {
      const { question, answer } = action.payload;

      const existingIndex = state.quizArr.findIndex(
        (item) => item.question === question
      );

      if (existingIndex >= 0) {
        state.quizArr[existingIndex].answer = answer;
      } else {
        state.quizArr.push({ question, answer });
      }
    },
    singUpData: (state, action) => {
      state.createAccount = action.payload;
    },
    quizStatus: (state, action) => {
      state.hitQuiz = action.payload;
    },
    getEmail: (state, action) => {
      state.emailForFGP = action.payload;
    },
    getOtp: (state, action) => {
      state.tOtpForFGP = action.payload;
    },
    forgetPageStatus: (state, action) => {
      state.forgetStatus = action.payload;
    },
    otpStatusFunc: (state, action) => {
      state.otpStatusValid = action.payload;
    },
    getCompareData: (state, action) => {
      const exixt = state.compareVal?.find((el) => el._id == action.payload);
      const update = state.filterInfo?.filter((el) => el._id == action.payload);
      const [obj] = update;
      if (state.compareVal.length == 2) {
        if (exixt) {
          state.compareVal = state.compareVal;
          localStorage.setItem("compareData", JSON.stringify(state.compareVal));
          return;
        } else {
          state.compareVal.pop();
          state.compareVal.push(obj);
          localStorage.setItem("compareData", JSON.stringify(state.compareVal));
        }
      }

      if (state.compareVal.length <= 1) {
        if (exixt) {
          state.compareVal = state.compareVal;
          localStorage.setItem("compareData", JSON.stringify(state.compareVal));
          return;
        } else {
          state.compareVal = [...state.compareVal, update].flat();
          localStorage.setItem("compareData", JSON.stringify(state.compareVal));
          return;
        }
      }
    },
    deletCompareData: (state, action) => {
      state.compareVal = [];
      localStorage.setItem("compareData", JSON.stringify(state.compareVal));
    },

    // peer filter start
    getPopular: (state, action) => {
      console.log(action.payload);
    },
    insFilter: (state, action) => {
      // state.dataInfo = state.filterInfo?.filter(obj =>
      //     action.payload.every(value => obj.industry.includes(value))
      // );
      if (action.payload.length == 0) {
        state.dataInfo = state.filterInfo;
      } else {
        state.dataInfo = state.filterInfo?.filter((obj) =>
          action.payload.some((value) => obj.industry.includes(value))
        );
      }
    },
    locationFilter: (state, action) => {
      if (action.payload.length == 0) {
        state.dataInfo = state.filterInfo;
      } else {
        state.dataInfo = state.filterInfo?.filter((obj) =>
          action.payload.some((value) => obj.country.includes(value))
        );
      }
    },
    meeting_formateFilter: (state, action) => {
      state.dataInfo = state.filterInfo?.filter((el) => {
        if (el.meeting_format.toLowerCase() == action.payload.toLowerCase()) {
          return el;
        }
      });
    },
    insSearch: (state, action) => {
      state.dataInfo = state.filterInfo?.filter((el) => {
        if (action.payload == "") {
          return el;
        } else if (
          el.name.toLowerCase().startsWith(action.payload.toLowerCase())
        ) {
          return el;
        }
      });
    },
    locationSearch: (state, action) => {
      state.dataInfo = state.filterInfo?.filter((el) => {
        if (action.payload == "") {
          return el;
        } else if (
          el.country.toLowerCase().startsWith(action.payload.toLowerCase())
        ) {
          return el;
        }
      });
    },
    // peer filter end
    getsucessfully: (state, action) => {
      state.sucessfully = action.payload;
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
        state.filterInfo = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });

    // // searchFeatch start
    // builder
    //     .addCase(searchFeatch.pending, (state, action) => {
    //         state.searchLoading = true;
    //     })
    //     .addCase(searchFeatch.fulfilled, (state, action) => {
    //         state.compareVal2 = action.payload;
    //     })
    //     .addCase(searchFeatch.rejected, (state, action) => {
    //         state.compareVal2 = [];
    //     });
    // searchFeatch end
  },
});

export const {
  margeObject,
  singUpData,
  quizStatus,
  getEmail,
  getOtp,
  forgetPageStatus,
  otpStatusFunc,
  getCompareData,
  insFilter,
  locationFilter,
  meeting_formateFilter,
  insSearch,
  locationSearch,
  getAll,
  getPopular,
  getsucessfully,
  deletCompareData,
} = DataSlice.actions;

export default DataSlice.reducer;
