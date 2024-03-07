import axios from "axios";

const User = {

    check_user: async()=>{
        const res = await axios.get("/auth");
        return await res;
    },

    create_user: async(user, password)=>{
        // const res = await axios.get("/users/create");
        const res = await axios.post("/users/create", {
            username : user,
            password : password
        })
        return await res;
    },

    login_user: async(user, password)=>{
        const res = await axios.post("/users/login", {
            username : user,
            password : password
        })
        return await res;
    },

    auth_user: async()=>{
        
        const res = await axios.get(`/users/auth`)
        return await res;
    },

    logout_user: async()=>{
        const res = await axios.get('/users/logout');
        return await res.data.logout;
    }

}

export default User;