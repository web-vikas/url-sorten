"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
interface UserInfo {
  email: String | null;
  access_token: String | null;
  isLoggedIn: boolean;
  isNewLinkGenerated: boolean;
}

const useStore = create<UserInfo>()(
  devtools(
    persist(
      (set) => ({
        email: null,
        access_token: null,
        isLoggedIn: false,
        isNewLinkGenerated: false,
      }),
      { name: "user-info" }
    )
  )
);

export default useStore;
