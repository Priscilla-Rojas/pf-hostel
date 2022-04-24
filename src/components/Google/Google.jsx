import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import styles from '../Google/Google.module.css';

const clientId = 'Your-Client-Id';

function Google() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;

  const onLoginSuccess = async (googleData) => {
    let token = googleData.tokenId;
    let googleId = googleData.googleId;
    let imageGoogle = googleData.imageUrl;

    const res = await fetch(`${url}` + '/auth/signup', {
      method: 'POST',
      headers: new Headers({
        api: `${api}`,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ googleId }),
    });
    const res2 = await res.json();
    console.log('GOOGLE???>>', imageGoogle);
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (googleData) => {
    console.log('Login Failed:', googleData);
  };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <div className={styles.google}>
      {showloginButton ? (
        <GoogleLogin
          clientId="540051645175-sbuak0uu5auodj9ipes8lklhgeg39kfo.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      ) : null}

      {showlogoutButton ? (
        <GoogleLogout
          clientId="540051645175-sbuak0uu5auodj9ipes8lklhgeg39kfo.apps.googleusercontent.com"
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
    </div>
  );
}
export default Google;
