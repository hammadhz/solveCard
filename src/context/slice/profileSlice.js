import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    sectionLnk: "about",
    profileId: "",
    profileData: null,
    profileViewData: null,
  },
  reducers: {
    sectionLink: (state, action) => {
      state.sectionLnk = action.payload;
    },
    profilePicUpdate: (state, action) => {
      state.profilePic = action.payload;
    },
    profileCoverUpdate: (state, action) => {
      state.coverPic = action.payload;
    },
    profileIdSelect: (state, action) => {
      state.profileId = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setProfileviewData: (state, action) => {
      state.profileViewData = action.payload;
    },
  },
});

export const {
  selectColor,
  resetColor,
  selectLinkColor,
  resetLinkColor,
  sectionLink,
  profilePicUpdate,
  profileCoverUpdate,
  profileIdSelect,
  setProfileData,
  setProfileviewData,
} = profileSlice.actions;
export default profileSlice.reducer;
