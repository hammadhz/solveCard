import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    selectedColor: {
      bgColor: "#ffffff",
      textColor: "#000000",
      btn: {
        bgColor: "#000000",
        textColor: "#ffffff",
      },
    },
  },
  reducers: {
    selectColor: (state, action) => {
      console.log(action.payload, "payload color");
      state.selectedColor.bgColor = action.payload;
      console.log(state.selectedColor.bgColor, "action payload update state");
      const newColor = action.payload;

      if (newColor === "black") {
        state.selectedColor.btn.bgColor = "#ffffff";
        state.selectedColor.btn.textColor = "#000000";
      } else {
        state.selectedColor.btn.bgColor = newColor;
        state.selectedColor.btn.textColor = "#ffffff";
      }
    },
    resetColor: (state) => {
      state.selectedColor = {
        bgColor: "#ffffff",
        textColor: "#000000",
        btn: {
          bgColor: "#000000",
          textColor: "#ffffff",
        },
      };
    },
  },
});

export const { selectColor, resetColor } = themeSlice.actions;
export default themeSlice.reducer;
