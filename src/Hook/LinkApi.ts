const baseURL = process.env.REACT_APP_DB_URL;
const LinkApi = {
    Login: `${baseURL}/api/user/login`,
    Create: `${baseURL}/api/articles/create`,
    Category : `${baseURL}/api/articles/category`
};
export default LinkApi;
