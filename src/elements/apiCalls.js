const sever_url = "http://localhost:5000";
/**
 * API call for finding popular checked claims. Send .../popular
 * @returns A list that contains some popular results
 */
 export const getPopular = async () => {

  // await fetch(sever_url + "/popular")
  //   .then(res => setResult(res.json()))
  //   .catch(err => console.error(err));

  const response = await fetch(sever_url + "/popular");

  // if(!response.ok) {
  //   const message = `An error occured (getPoular): ${response.status}`;
  //   console.error(message);
  // }

  const popularClaims = await response.json();
  return popularClaims;
};

/**
 * API call for auto-checking AI. Send .../check with PUT
 * @param {a string - claim to check} claim 
 * @returns an auto-checked result
 */
export const checkClaim = async (claim) => {
  let autoResult = undefined;

  await fetch(sever_url + "/check", {
    method: "PUT",
    body: JSON.stringify(claim),
  })
  .then(res => res.json())
  .then(data => autoResult = data)
  .catch(err => console.error(err));

    return autoResult;
};

/**
 * Access to database and fetch user data. Try to log the user in. 
 * Use .../signIn (PUT)
 * @param {username and a passwd} userInfo 
 * @returns boolean - whether log in successfully
 */
export const signIn = async (userInfo) => {
  let sign_sucessful = false;

  await fetch(sever_url + "/signIn", {
    method: "PUT",
    body: userInfo,
  })
  .then(res => res.json())
  .then(data => sign_sucessful=data)
  .catch(err => console.error(err));

  return sign_sucessful;
};

/**
 * Access to database, try to create a new user. 
 * Send .../signUp
 * @param {username and a passwd} usrInfo 
 * @returns boolean - whether sign up successfully
 */
export const signUp = async (userInfo) => {
  let signup_success = false;

  await fetch(sever_url + "/signUp", {
    method: "PUT",
    body: userInfo,
  })
  .then(res => res.json())
  .then(data => signup_success = data)
  .catch(err => console.error(err));

  return signup_success;
};

/**
 * Send a verification code to the given email.
 * Send .../sendCode
 * @param {string} email 
 * @return veriCode just sent
 */
export const sendVeriCode = async (email) => {
  let code = undefined;

  await fetch(sever_url + "/sendCode", {
    method: "PUT",
    body: email,
  })
  .then(res => res.json())
  .then(data => code=data)
  .catch(err => console.error(err));

  return code;
};
