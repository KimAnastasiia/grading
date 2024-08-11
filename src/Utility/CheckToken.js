

function checkToken() {

    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("No access token found");
    } else {
        return token;
    }
}

export default checkToken;