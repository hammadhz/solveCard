import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    sectionLnk: "about",
    profileId: "",
    profileData: null,
    profileViewData: null,
    themeColor: "#FFFFFF",
    textColor: "#000000",
    platforms: [],
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
    setProfileViewData: (state, action) => {
      state.profileViewData = action.payload;
    },
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setPlatform: (state, action) => {
      state.platforms = action.payload;
    },
    pushPlatform: (state, action) => {
        const index = state.platforms.findIndex(
            (platform) => platform.id === action.payload.id
        );
        if (index !== -1) {
            state.platforms[index] = action.payload;
        } else {
            state.platforms.push(action.payload);
        }
    }
  },
});

export const {
  setThemeColor,
  setTextColor,
  sectionLink,
  profilePicUpdate,
  profileCoverUpdate,
  profileIdSelect,
  setProfileData,
  setProfileViewData,
  setPlatform,
  pushPlatform,
} = profileSlice.actions;
export default profileSlice.reducer;
