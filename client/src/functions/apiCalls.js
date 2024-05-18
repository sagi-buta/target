import axios from "axios"
// axios.defaults.baseURL = "https://target-pedagogy.com"
axios.defaults.baseURL = "http://localhost:8080"      



async function apicalls(method, url, data,headers) {

    try {
        const result = await axios({
            method,
            data,
            url,
            headers: {
                ...headers,
                "authorization":  localStorage.getItem("token"),
                "adminid": localStorage.getItem("id")
                // "adminid": false
            }
        })
        return result.data

    } catch (error) {
        console.log(error);
        throw error
    }
}

const get = (url,headers) => {
    return apicalls("get", url,headers)
}

const post = (url, data,headers) => {
    return apicalls("post", url, data,headers)
}

const put = (url, data,headers) => {
    return apicalls("put", url, data,headers)
}

const Delete = (url, data,headers) => {
    return apicalls("delete", url, data,headers)
}
export default ({ get, post, put, Delete })



