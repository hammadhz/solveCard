import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    sectionLnk: "about",
    profileId: "",
    profileData: null,
    profileViewData: null,
    themeColor: "#FFFFFF",
    textColor: "#000000",
    qrColor: "#2A9562",
    qrPhoto: null,
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
    setQrColor: (state, action) => {
      state.qrColor = action.payload;
    },
    setQrPhoto: (state, action) => {
      state.qrPhoto = action.payload;
    },
    pushPlatform: (state, action) => {
      const profilePlatforms = state.profileData?.platforms;
        const index = profilePlatforms.findIndex(
            (platform) => platform.id === action.payload.id
        );
        if (index !== -1) {
            profilePlatforms[index] = action.payload;
        } else {
            profilePlatforms.push(action.payload);
        }
      state.profileViewData.platforms = profilePlatforms;
    },
    removePlatform: (state, action) => {
      const profilePlatforms = state.profileData?.platforms;
      const index = profilePlatforms.findIndex(
        (platform) => platform.user_platforms_id === action.payload
      );
      if (index !== -1) {
        profilePlatforms.splice(index, 1);
      }
      state.profileViewData.platforms = profilePlatforms;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.sectionLnk = "about";
      state.profileId = "";
      state.profileData = null;
      state.profileViewData = null;
      state.themeColor = "#FFFFFF";
      state.textColor = "#000000";
      state.qrColor = "#2A9562";
      state.qrPhoto = null;
    });
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
  pushPlatform,
  setQrColor,
  setQrPhoto,
  removePlatform
} = profileSlice.actions;
export default profileSlice.reducer;
