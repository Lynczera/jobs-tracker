import axios from "axios";

const User = {

    check_user: async()=>{
        const res = await axios.get("/auth");
        return await res;
    },

    create_user: async(user)=>{
        // const res = await axios.get("/users/create");
        const res = await axios.post("/users/create", {
            username : user
        })
        return await res;
    }

}

export default User;