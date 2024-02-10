import profileDataRowTmpl from "./profile-data-row.hbs?raw";
import Handlebars from "handlebars";
import "./profile-data-row.css";

type ProfileDataRowProps = {
  label: string;
  name: string;
  value: string;
  disabled: boolean;
};

export const ProfileDataRow = (params: ProfileDataRowProps) => {
  return Handlebars.compile(profileDataRowTmpl)(params);
};
