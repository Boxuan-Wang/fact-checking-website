const sever_url = "http://202.61.201.7:5000";

/**
 * API call for get the checking history of a user
 * @param  userName string -- user email
 * @returns HistoryEntry array {claim:string, date: number}
 */
export const getHistory = async (userName) => {
  let ret = [];
   await fetch(sever_url + "/history", {
    method:"POST",
    body: JSON.stringify({
      userName: userName
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => ret = data.history)
  .catch(err => console.error(err));

  return ret;
};

/**
 * API call for finding popular checked claims. Send .../popular
 * @returns A list that contains some popular results
 */
 export const getPopular = async () => {
  const response = await fetch(sever_url + "/popular");
  const popularClaims = await response.json();
  // console.log(popularClaims[0].claim);
  return popularClaims;
};

/**
 * API call for auto-checking AI. Send .../check with PUT
 * @param claim string -- claim to check
 * @param userName string -- user email
 * @returns an auto-checked result
 */
export const checkClaim = async (claim, userName) => {
  let result;
  await fetch(sever_url + "/checkClaim", {
    method: "POST",
    body: JSON.stringify({
      query: claim,
      userName: userName
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => result = data)
  .catch(err => console.error(err));

  // console.log(result);
  return result;
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
    method: "POST",
    body: JSON.stringify({
      userName: userInfo.userName,
      passwd: userInfo.passwd
    }),
    headers: {
      "Content-Type": "application/json",
    },

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
    method: "POST",
    body: JSON.stringify({
      userName: userInfo.userName,
      passwd: userInfo.passwd
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => signup_success = data)
  .catch(err => console.error(err));

  return signup_success;
};

/**
 * Send a verification code to the given email.
 * Send .../sendCode
 * @param {string} emailAddress 
 * @return hashed veriCode just sent
 */
export const sendVeriCode = async (emailAddress) => {
  console.log("sending email");
  let code = undefined;
  await fetch(sever_url + "/email", {
    method: "POST",
    body: JSON.stringify({email:emailAddress}),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => code=data.veriCode)
  .catch(err => console.error(err));

  return code;
};

/**
 * Delete an account with given userName.
 * @param {string} userName 
 * @returns {boolean} delete success
 */
export const deleteUser = async (userName) => {

  let delete_success = false;
  await fetch(sever_url + "/deleteUser", {
    method:"POST",
    body: JSON.stringify({userName: userName}),
      headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => delete_success = (data!==null&&data!==undefined))
  .catch(err => console.error(err));
  
  return delete_success;
}