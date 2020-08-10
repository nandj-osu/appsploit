//Finding/Parsing cookies: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
const cookieName = "connect.sid";
const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName))
    .split("=")[1];

alert(`${cookieName}=${cookieValue}`);
