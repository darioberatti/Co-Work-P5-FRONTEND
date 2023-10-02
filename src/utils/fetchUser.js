//Redux fetch

const { default: axiosInstance } = require("../../axiosConfig");
import { loginUser } from "@/redux/user";


export const fetchUser = async (dispatch) => {
  try {
    const user = await axiosInstance.get("/user/me");
    dispatch(loginUser(user.data));
  } catch (err) {
    console.error(err);
  }
};