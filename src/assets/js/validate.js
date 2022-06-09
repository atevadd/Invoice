export const validate = (value) => {
  if (value == "" || value.length < 1) {
    return "This field is required";
  }

  return true;
};
