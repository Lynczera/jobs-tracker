import axios from "axios";

const Auth = {

    check_user: async()=>{
        const res = await axios.get("/auth");
        return await res;
    }

}

export default Auth;