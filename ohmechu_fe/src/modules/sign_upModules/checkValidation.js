function validateEmail(email) {
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
  return passwordRegex.test(password);
}

function checkVerifyPassword(password, passwordCheck) {
  return password === passwordCheck;
}

function validateName(name) {
  return name.trim() !== '';
}

export { validateEmail, validatePassword, checkVerifyPassword, validateName };
