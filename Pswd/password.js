function generatePassword() {
    // Define the possible characters
    let length = 10
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
  
    // create a variable to store the generated password
    let password = '';
  
    // iterate over the length argument passed to the function
    for (let i = 0; i < length; i++) {
      // Choose a random character from the possible characters defined
      let randChar = chars.charAt(Math.floor(Math.random() * chars.length));
      // Append character to the password
      password += randChar;
    }
  
    // return new randomly generated password
    return password;
}

export default generatePassword;