import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    sectionLnk: "about",
    profileId: null,
    profileUpdate: {
      profilePic: "",
      coverPic: "",
    },
    selectedColor: {
      bgColor: "#ffffff",
      textColor: "#000000",
      btn: {
        bgColor: "#000000",
        textColor: "#ffffff",
      },
    },
    linkTheme: {
      emailColor: "#60a5fa",
      phoneColor: "#4ade80",
    },
  },
  reducers: {
    selectColor: (state, action) => {
      state.selectedColor.bgColor = action.payload;
      // const newColor = action.payload;

      // if (newColor === "black") {
      //   state.selectedColor.btn.bgColor = "#ffffff";
      //   state.selectedColor.btn.textColor = "#000000";
      // } else {
      //   state.selectedColor.btn.bgColor = newColor;
      //   state.selectedColor.btn.textColor = "#ffffff";
      // }
    },
    selectLinkColor: (state, action) => {
      state.linkTheme.emailColor = action.payload;
      state.linkTheme.phoneColor = action.payload;
      state.selectedColor.btn.bgColor = action.payload;
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
    resetLinkColor: (state) => {
      state.linkTheme = {
        emailColor: "#60a5fa",
        phoneColor: "#4ade80",
      };
      state.selectedColor = {
        btn: {
          bgColor: "#000000",
        },
      };
    },
    sectionLink: (state, action) => {
      state.sectionLnk = action.payload;
    },
    profileUpdate: (state, action) => {
      state.profileUpdate.profilePic = action.payload.profilePic;
      state.profileUpdate.coverPic = action.payload.coverPic;
    },
    profileIdSelect: (state, action) => {
      state.profileId = action.payload;
    },
  },
});

export const {
  selectColor,
  resetColor,
  selectLinkColor,
  resetLinkColor,
  sectionLink,
  profileUpdate,
  profileIdSelect,
} = profileSlice.actions;
export default profileSlice.reducer;
