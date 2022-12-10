const baseURL = "https://techomia-rest.onrender.com/api";

const getAllEventsEndpoint = "/events/all";
const getAllUserEventsEndpoint = "/events/allUserEvents";
const UserRegistrationManagementEndpoint = "/events/registration/";
const userSignUpEndpoint = "/users/sign-up";
const userSignInEndpoint = "/users/sign-in";
const userInfoEndpoint = "/users/info";

var events = [];

const AuthClient = axios.create({
  baseURL,
});

const getAllEvents = async () => {
  try {
    document.querySelector(".loader-container").style.display = "block";

    const { data, status } = await AuthClient.get(getAllEventsEndpoint);

    document.querySelector(".loader-container").style.display = "none";

    console.log(status);

    return data.events;
  } catch (err) {
    console.log(err);
    alert("Failed to get all events");

    return null;
  }
};

const manageUserEventregistration = async (eventId, operation) => {
  try {
    if (!isAccessToken()) {
      // user needs to sign in
      // redirect to sign in page
      alert("Please sign in ");

      location.replace("/");
      closeModal();
      modalLogin.classList.remove("hidden");
      overlayLogin.classList.remove("hidden");

      return;
    }

    const operationsAllowed = ["register", "deregister"];

    if (!operationsAllowed.includes(operation)) {
      alert("Invalid event registration operation");
      return;
    }

    const { data, status } = await AuthClient.post(
      UserRegistrationManagementEndpoint + operation,
      {
        eventId,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    console.log(status);

    return { success: true, data };
  } catch (err) {
    console.log(err);
    console.log("Error in event registration");

    return { success: false, message: err?.response?.data?.message };
  }
};

const signupUser = async (email, userName, password) => {
  try {
    const { data, status } = await AuthClient.post(userSignUpEndpoint, {
      email,
      name: userName,
      password,
    });
    console.log(status);

    return data;
  } catch (err) {
    console.log(err);

    alert(`Failed to sign up user : ${err?.response?.data?.message}`);
  }
};

const signInUser = async (email, password) => {
  try {
    const { data, status } = await AuthClient.post(userSignInEndpoint, {
      email,
      password,
    });

    const { success, token } = data;

    if (!success) {
      throw new Error("Failed to signin");
    }
    // we will save the token in localstorage by key access_token
    localStorage.setItem("access_token", token);
    console.log("Token saved successfully in local storage");

    isAccessToken();

    return true;
  } catch (err) {
    console.log(err);

    alert(`Failed to sign up user : ${err?.response?.data?.message}`);
  }
};

const capatalize = (word) =>
  word.slice(0, 1).toUpperCase() + word.toLowerCase().slice(1, word.length);

const isAccessToken = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const element = document.querySelector(
      "body > header > nav > ul > li.nav__item.btn--user > a"
    );

    if (!token) {
      return false;
    }

    const { data } = await AuthClient.get(userInfoEndpoint, {
      headers: {
        Authorization: "bearer " + token,
      },
    });

    if (element) element.innerHTML = "Logout " + capatalize(data.user.name);

    return true;
  } catch (err) {
    console.log(err);
    alert("Failed to verify session, signin again");
  }
};

const getAllUserEvents = async () => {
  try {
    if (!isAccessToken()) {
      // user needs to sign in
      // redirect to sign in page

      location.replace("/");
      return;
    }

    document.querySelector(".loader-container").style.display = "block";

    const { data, status } = await AuthClient.get(getAllUserEventsEndpoint, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    document.querySelector(".loader-container").style.display = "none";

    console.log(status);

    return data.events;
  } catch (err) {
    console.log(err);

    alert("Failed to get all user registered events");
  }
};
