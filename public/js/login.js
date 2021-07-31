const loginButton = document.getElementsByClassName("login_form");
function aboutSubmit(e) {
  e.preventDefault();
  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }).then((result) => console.log(result)),
  });
}

loginButton.addEventListener("submit", () => {
  aboutSubmit();
  location.href = "/";
});

//	location.href="/";const loginButton = document.getElementsByClassName("login_form");
function aboutSubmit(e) {
  e.preventDefault();
  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }).then((result) => console.log(result)),
  });
}

loginButton.addEventListener("submit", () => {
  aboutSubmit();
  location.href = "/";
});

//	location.href="/";