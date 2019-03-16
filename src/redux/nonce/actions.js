export const LOAD_USER = "LOAD_USER";

export const loadUser = email => {
  return {
    type: LOAD_USER,
    email
  };
};
