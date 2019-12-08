export function login(credentials) {
    return new Promise(function (resolve, reject) {
        // eslint-disable-next-line no-undef
        axios.post('/login', credentials).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            reject(err.response.data.error);
        });
    });
}

export function getAuthLocalUser() {
    const userStringData = localStorage.getItem("user");
    if (!userStringData) {
        return null;
    }
    return JSON.parse(userStringData);
}
