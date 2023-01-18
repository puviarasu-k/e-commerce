import Axios from "axios";
import swal from "sweetalert";

const LoginApiCall = Axios.create({
    baseURL: 'http://localhost:2000'
});

export const loginApi = async (obj) => {
    try{
    const res = await LoginApiCall.post('/login', obj);
    return res.data;
    }
    catch(err){
        console.log(err)
        return err;
        
    }
}
