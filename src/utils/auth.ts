export const authenticate = async (username: string, password: string) => {
  if (
    // Backend Database Solution Must Be Added Later
    username === "username123" &&
    password === "password123"
  ) {
    return true;
  } else {
    return false;
  }
};
