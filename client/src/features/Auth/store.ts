import createStore from 'react-auth-kit/createStore';

const store: any = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: "afcon-sbme-server.onrender.com",
    cookieSecure: window.location.protocol === 'https:',
  });

export default store

