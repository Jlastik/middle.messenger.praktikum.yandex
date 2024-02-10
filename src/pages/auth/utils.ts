import { AuthForm, AuthFormProps } from "src/components/auth-form";

type CreateFormProps = {
  root: string;
  formData: AuthFormProps;
};

export const createForm = ({ root, formData }: CreateFormProps) => {
  const container = document.getElementById(root);

  if (container) {
    container.innerHTML = AuthForm(formData);
  }
};
