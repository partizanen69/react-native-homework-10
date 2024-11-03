import { RootState } from "./store";
import { UserState } from "./userSlice";

export const selectUser = (state: RootState): UserState => state.user;

export const selectUserName = (state: RootState): string =>
  selectUser(state).name;
export const selectUserEmail = (state: RootState): string =>
  selectUser(state).email;
