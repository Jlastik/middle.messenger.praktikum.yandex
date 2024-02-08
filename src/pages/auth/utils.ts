import { Form, FormProps } from "src/components/form";

type CreateFormProps = {
  root: string;
  formData: FormProps;
};

export const createForm = ({ root, formData }: CreateFormProps) => {
  const container = document.getElementById(root);

  if (container) {
    container.innerHTML = Form(formData);
  }
};
