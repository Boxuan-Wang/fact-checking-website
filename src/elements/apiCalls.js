/**
 * API call for finding popular checked claims. 
 * @returns A list that contains some popular results
 */
 export const getPopular = () => {
    const results = [
      {claim: "what a web I wrote"}
    ];
  return results;
};

/**
 * API call for auto-checking AI
 * @param {a string - claim to check} claim 
 * @returns an auto-checked result
 */
export const checkClaim = (claim) => {
    return null;
};

/**
 * Access to database and fetch user data. Try to log the user in. 
 * @param {username and a passwd} userInfo 
 * @returns boolean - whether log in successfully
 */
export const signIn = (userInfo) => {
  return true;
};

/**
 * Access to database, try to create a new user. 
 * @param {username and a passwd} usrInfo 
 * @returns boolean - whether sign up successfully
 */
export const signUp = (usrInfo) => {
  return true;
};

/**
 * Send a verification code to the given email.
 * @param {string} email 
 * @return veriCode just sent
 */
export const sendVeriCode = (email) => {
  return "0000";
};
