import axiosConfig from "../../config/api";

const TourService = {
    getAll: async (params) => {
        const response = await axiosConfig.get("/tour", {
            params,
          });
          return response.data;
    },
    getOne: async (slug, params ={}) => {
        const response = await axiosConfig.get(`/tour/${slug}`, {
            params,
          });
          return response.data;
    }
}

export default TourService;