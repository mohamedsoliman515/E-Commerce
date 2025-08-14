import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";

type TResponse = { id: number; title: string; prefix: string; img: string }[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",

  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    
    try {
      const response = await axios.get<TResponse>(
        "/categories",{signal}
      );
      return response.data;
      
    } catch (error) {
      return  rejectWithValue(axiosErrorHandler(error))
    }
  }
);

export default actGetCategories;
