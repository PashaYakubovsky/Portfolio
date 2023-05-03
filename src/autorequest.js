var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    message:
        "Never gonna give you up, never gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry, never gonna say goodbye\nNever gonna tell a lie and hurt yo",
});

var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
};

function tick() {
    fetch("http://localhost:25055/change-3d-text", requestOptions)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            setTimeout(tick, 5000);
        })
        .catch((error) => console.log("error", error));
}

tick();
