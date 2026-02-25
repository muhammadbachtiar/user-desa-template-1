import axiosConfig from "../../config/api";

const PressReleaseService = {
    getAll: async (params = {}) => {
        const response = await axiosConfig.get("/press-release", {
            params,
        });
        return response.data;
    },

    getOne: async (slug, params = {}) => {
        const response = await axiosConfig.get(`/press-release/${slug}`, {
            params,
        });
        return response.data;
    }
}

export default PressReleaseService;