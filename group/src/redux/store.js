import { configureStore } from '@reduxjs/toolkit'
import groupSlice from './groupSlice'
export default configureStore({
    reducer: {
        groupInfo: groupSlice
    },
})