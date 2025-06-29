import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchGroups = createAsyncThunk('fetchGroups', async () => {
    const rsl = await axios.get('https://api.coachfinder.app/api/v1/groups');
    let res = await rsl.data
    return res.data.data
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

export const groupSlice = createSlice({
    name: 'groupSlice',
    initialState: {
        createAccount: {},
        tOtpForFGP: false,
        successNotice: false,
        planPage: false,
        createGroupPage: false,
        gender: "Meal",
        planObj1: false,
        planObj2: false,
        userDeatails: {},
        userGroup: {},
        resetPageStatus: false,
        emailStatus: false,
        otp: false,
    },

    reducers: {
        singUpData: (state, action) => {
            state.createAccount = action.payload
        },
        pageShowFunc: (state, action) => {
            state.tOtpForFGP = action.payload
        },
        pageShowFunc2: (state, action) => {
            state.successNotice = action.payload
        },
        pageShowFunc3: (state, action) => {
            state.planPage = action.payload
        },
        pageShowFunc4: (state, action) => {
            state.createGroupPage = action.payload
        },
        getGender: (state, action) => {
            state.gender = action.payload
        },
        getplanObj1: (state, action) => {
            state.planObj1 = action.payload
        },
        getplanObj2: (state, action) => {
            state.planObj2 = action.payload
        },
        getUserDetails: (state, action) => {
            state.userDeatails = action.payload
        },
        userGroupDetails: (state, action) => {
            state.userGroup = action.payload
        },
        resetPageShow: (state, action) => {
            state.resetPageStatus = action.payload
        },
        verification: (state, action) => {
            state.emailStatus = action.payload
        },
        getOtp: (state, action) => {
            state.otp = action.payload
        },
        deleteGroup: (state, action) => {
            state.userGroup = action.payload
        },
    },

})

export const {
    singUpData,
    pageShowFunc,
    pageShowFunc2,
    pageShowFunc3,
    getGender,
    getplanObj1,
    getplanObj2,
    getUserDetails,
    userGroupDetails,
    pageShowFunc4,
    resetPageShow,
    verification,
    otpPage,
    getOtp,
    deleteGroup
} = groupSlice.actions

export default groupSlice.reducer