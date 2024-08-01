import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import adminSlice from '../features/adminSlice';
import employeeSlice from '../features/employeeSlice';


export const store = configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice,
        employee:employeeSlice
    }
})