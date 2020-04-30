console.log("here");

navigator.serviceWorker.addEventListener("message", receiveMessage);
function receiveMessage(event){
    console.log("got message");
    if (event.origin !== "http://127.0.0.1:8000")
        return;
    localStorage.setItem("csrfToken", event.data);
}
