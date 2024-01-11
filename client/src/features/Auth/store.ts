import createStore from 'react-auth-kit/createStore';

const store: any = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: 'window.location.hostname',
    cookieSecure: false
  });

export default store

