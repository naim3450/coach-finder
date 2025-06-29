import { configureStore } from '@reduxjs/toolkit'
import FilterSlice from './FilterSice'
import ArchivedSlice from './ArchivedSlice'
export default configureStore({
    reducer: {
        FilterSlice: FilterSlice,
        ArchivedSlice: ArchivedSlice,
    },
})