import "./profile-page.css";
import { ProfileDataRow } from "src/components/profile-data-row";
import { getProfileDataWithStatus } from "./utils.ts";
import {
  CHANGE_PWD_BTN_TMPL,
  EDIT_BTN_TMPL,
  EXIT_BTN_TMPL,
  SAVE_BTN_TMPL,
} from "./const.ts";

const backContainer = document.getElementById("profile_back_container");
if (backContainer) {
  backContainer.addEventListener("click", () => window.open("/home", "_self"));
}

const profileDataContainer = document.getElementById("profile_data");
const profileControllersContainer = document.getElementById(
  "profile_controllers",
);
let profileEditBtn = document.getElementById("profile_edit_btn");

const createUserData = () => {
  const userData = getProfileDataWithStatus(true).map((el) =>
    ProfileDataRow(el),
  );
  if (profileDataContainer) {
    profileDataContainer.innerHTML = userData.join("");
  }
  if (profileControllersContainer) {
    profileControllersContainer.innerHTML =
      EDIT_BTN_TMPL + CHANGE_PWD_BTN_TMPL + EXIT_BTN_TMPL;
  }

  const exitBtn = document.getElementById("profile_exit_btn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => window.open("/", "_self"));
  }
  profileEditBtn = document.getElementById("profile_edit_btn");
  if (profileEditBtn) {
    profileEditBtn.addEventListener("click", () => {
      createUserEditInputs();
    });
  }
};
createUserData();

const createUserEditInputs = () => {
  const userData = getProfileDataWithStatus(false).map((el) =>
    ProfileDataRow(el),
  );
  if (profileDataContainer) {
    profileDataContainer.innerHTML = userData.join("");
  }

  if (profileControllersContainer) {
    profileControllersContainer.innerHTML = SAVE_BTN_TMPL;

    const profileSaveBtn = document.getElementById("profile_save_btn");
    if (profileSaveBtn) {
      profileSaveBtn.addEventListener("click", () => {
        createUserData();
      });
    }
  }
};

if (profileEditBtn) {
  profileEditBtn.addEventListener("click", () => {
    createUserEditInputs();
  });
}
