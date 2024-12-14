const fetchButton = document.getElementById("doFetch");
const fetchButtonXHR = document.getElementById("doFetchXHR");
const fetchDisplayTitle = document.getElementById("fetchDataTitle");
const fetchDisplayBody = document.getElementById("fetchDataBody");

const fetchDisplayXHRTitle = document.getElementById("fetchDataXHRTitle");
const fetchDisplayXHRBody = document.getElementById("fetchDataXHRBody");

fetchButton.addEventListener("click", function () {
  fetch(`https://jsonplaceholder.typicode.com/posts/1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })

    .then((jsonData) => {
      fetchDisplayTitle.textContent = jsonData.title;
      fetchDisplayBody.textContent = jsonData.body;
    })

    .catch((error) => {
      fetchDisplayBody.textContent = `Could not fetch data ${error}`;
    });
});

fetchButtonXHR.addEventListener("click", function () {
  const request = new XMLHttpRequest();

  try {
    request.open("GET", "https://jsonplaceholder.typicode.com/posts/2");

    request.responseType = "json";

    request.addEventListener(
      "load",
      () => (fetchDisplayXHRTitle.textContent = request.response.title)
    );

    request.addEventListener(
      "load",
      () => (fetchDisplayXHRBody.textContent = request.response.body)
    );

    request.addEventListener("error", () => console.error("XHR error"));

    request.send();
  } catch (error) {
    console.error(`XHR error ${request.status}`);
  }
});

//---------------------------------- POST section ------------------------------//

const formDataTitle = document.getElementById("title");
const formDataBody = document.getElementById("body");
const formDataID = document.getElementById("id");
const formSubmit = document.getElementById("submitForm");
const statusInfo = document.getElementById("status");
const postID = formDataID.value;

const myHeader = new Headers();
myHeader.append("Content-Type", "application/json");

formSubmit.addEventListener("click", async function () {
  if (!formDataID.value || !formDataBody.value || !formDataTitle.value) {
    statusInfo.textContent = "Please make sure the fields are not empty!";
  } else {
    try {
      const postRequest = new Request(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",

          body: JSON.stringify({
            title: formDataTitle.value,
            body: formDataBody.value,
            id: formDataID.value,
          }),

          headers: myHeader,
        }
      );

      const postResponse = await fetch(postRequest);
      console.log(postResponse.status);
      statusInfo.textContent =
        "POST action was Successfully!! (status code: " +
        postResponse.status +
        ")";
    } catch (error) {
      statusInfo.textContent =
        "There was an error! (status code: " + postResponse.status + ")";
    }
  }
});

//----------------------- PUT section ------------------------//

const pullRequest = document.getElementById("pullXHR");
const pullRequestDisplay = document.getElementById("updatedData");

const dataToUpdate = {
  title: "Updated formDataTitle",
  body: "Updated formDataBody",
};

pullRequest.addEventListener("click", function () {
  const putRequest = new XMLHttpRequest();

  try {
    putRequest.put(
      "https://jsonplaceholder.typicode.com/posts/" + postID,
      dataToUpdate,
      (pullRequestDisplay.textContent =
        "Here is the updated data: " + dataToUpdate)
    );
  } catch (error) {
    pullRequestDisplay.textContent = "Oopss! There was an error!";
  }
});

//--------------------- DELETE section -----------------------//

const deletePost = document.getElementById("delete");
const deleteMessage = document.getElementById("deletedData");
const success = "The entry with id: " + postID + " was deleted";

deletePost.addEventListener("click", function () {
  if (!postID) {
    deleteMessage.textContent =
      "An error occured! please post an entry in the Post Section and try deletion again.";
  } else {
    try {
      fetch("https://jsonplaceholder.typicode.com/posts/" + postID, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })

        .then((jsonData) => {
          deleteMessage.textContent = success;
        });
    } catch {
      deleteMessage.textContent = new Error(`HTTP error: ${response.status}`);
    }
  }
});
