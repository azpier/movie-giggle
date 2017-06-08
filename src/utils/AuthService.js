import decode from 'jwt-decode';
import auth0 from 'auth0-js';

const ID_TOKEN_KEY = '593599ce75adb0380a0a9669';
const ACCESS_TOKEN_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1EUTVSREV6T1RZeVFrUXhRamN5UWtZMlFqSkZOakV6UkRsR09EUkZNRUpHUWpSQ01qWkdOdyJ9.eyJpc3MiOiJodHRwczovL2VzdGViYW5yZWQuYXV0aDAuY29tLyIsInN1YiI6IlBxdzdCSlMxaDMzZTcwNjdpU2dlNGV4MktuTFczQWMyQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2VzdGViYW5yZWQuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTY5NTE3MzksImlhdCI6MTQ5Njg2NTMzOSwic2NvcGUiOiIifQ.CpeagjoclCWtl9s_0lFXJYkyMXfb7vRPO3zHVZie4-TAjA3OSylCOb4UjSl_-6NQXDasE0YJhz6PMQBDuQJkcpwEgPu2azbQYgv5kvCQxS4yCf9n4ovIhBpCyWjr9oFwTej89BmXjbOGAPjwNJJHZ2ulraN7kYCYmCOzWOfW35S_LtILlLray7Iw9LmNfHY-VlNsGzxiy7Fr2o14Bwa_g-QnvP-lx-klKZ9N0bPf3dy5XtImTiM5k3MEq_wBQSPljmqUTPjt29wB3N2GBS9-slDea4KV0ciew5K6sTtGoJYKsPa02BhWsYImZYgb_rt_Aybx4BWad1mlIUto5h0KIg';

const CLIENT_ID = 'Pqw7BJS1h33e7067iSge4ex2KnLW3Ac2';
const CLIENT_DOMAIN = 'estebanred.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'YOUR_SCOPE';
const AUDIENCE = 'https://estebanred.auth0.com/api/v2/';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}