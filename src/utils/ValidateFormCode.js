export const ValidateFormEmail = (email) => {
 
    const emailCheck = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  

  if (!emailCheck) {
    return "Invalid Email Format";
  } 
  return null;

};

export const ValidateFormPassword=(password) =>{

    const passwordCheck =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!passwordCheck) {
        return "Invalid Password Format";
      }
      return null;
}
