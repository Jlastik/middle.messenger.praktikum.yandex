import { PROFILE_DATA } from "./const.ts";

export const getProfileDataWithStatus = (disabled: boolean) => {
  return PROFILE_DATA.map((el) => ({ ...el, disabled: disabled }));
};
