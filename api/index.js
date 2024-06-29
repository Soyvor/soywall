import axios from "axios";
const API='44679269-926b0d485bb2ea8a5ccc37b82';
const apiUrl= 'https://pixabay.com/api/?key=${API}';

const formatUrl = (params)=>{ // {q, page, category, order}
    let url = apiUrl+"&per_page=25&safesearch=true&editors_choice=true"
    if(params) return url;
    let paramsKeys = Object.keys(params);
    paramsKeys.map(key=>{
        let value = key=='q'?encodeURIComponent(params[key]):params[key];
        url += `&${key}=${value}`
    });
    console.log('final url: ', url);
    return url;
}
export const apiCall = async (params)=>{
    try{
        const response = await axios.get(formatUrl(params))
        return data;
    }catch(error){
        console.log('error aa gaya', err.message);
        return {success: false, msg: err.message};
    }
}