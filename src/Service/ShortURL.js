import axios from "axios";
let URL = "http://localhost:8080"

const generateShortURL= async (inputObj)=>  {
   let response = await axios.post(URL + '/generate-Short-url',inputObj);
   if(response.data.responseCode === 200){
      return response.data;
   }else{
      return{};
   }
}

export default generateShortURL


