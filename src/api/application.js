import axios from "axios";

import cheerio from "cheerio";

const Application = {

    add_app: async(jID, date, status)=>{
        const data = await axios.post("/applications/add_app", {
            jID,
            date,
            status
        })

        return data.data;

    },

    get_apps: async()=>{
        const data = await axios.get("/applications/apps");
        return data.data;

    },

    remove_apps: async(apps)=>{
        const data = await axios.post("/applications/remove", {
            apps
        });
        return data.data;
    }
}

export default Application;