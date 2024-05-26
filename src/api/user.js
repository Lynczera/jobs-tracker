import axios from "axios";

const User = {
  check_user: async () => {
    const res = await axios.get("/auth");
    return res;
  },

  create_user: async (user, password) => {
    const res = await axios.post("/users/create", {
      username: user,
      password: password,
    });
    return res;
  },

  login_user: async (user, password) => {
    const res = await axios.post("/users/login", {
      username: user.trimEnd(),
      password: password,
    });
    return res;
  },

  auth_user: async () => {
    const res = await axios.get(`/users/auth`);
    return res;
  },

  logout_user: async () => {
    const res = await axios.get("/users/logout");
    return res.data.logout;
  },
};

export default User;

