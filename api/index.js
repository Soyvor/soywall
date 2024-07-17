import axios from "axios";

const API_KEY='44679269-926b0d485bb2ea8a5ccc37b82';
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
    let url = apiUrl+"&per_page=25&safesearch=true&editors_choice=true";
    if (!params)return url;
    let paramsKeys = Object.keys(params);
    paramsKeys.forEach(key => {
        let value = key == 'q'?encodeURIComponent(params[key]) : params[key];
        url += `&${key}=${value}`;
    });
    
    return url;
}

export const apiCall = async (params) => {
    try {
        const url = formatUrl(params);
        const response = await axios.get(url);
        const { data } = response;
        
        return { success: true, data }
    } catch (error) {
        console.log('Error: ', error.message); // Debugging line to see the error message
        return { success: false, msg: error.message };
    }
}

