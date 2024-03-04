import axios from "axios";

const User = {

    check_user: async()=>{
        const res = await axios.get("/auth");
        return await res;
    },

    create_user: async()=>{
        const res = await axios.get("/users/create");
        return await res;
    }

}

export default User;