export function authHeader() {
    return { 'Accept': 'application/json',
             'token': localStorage.getItem('user')};
}
