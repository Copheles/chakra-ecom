import axios from "axios";
import { resetUpdate, setError, setLoading, updateUserProfile, userLogin, userLogout } from "../slices/user";

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );
    console.log(data)
    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response)
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured.Please try again later"
      )
    );
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register",
      {
        name,
        email,
        password,
      },
      config
    );

    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured.Please try again later"
      )
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(resetUpdate());
  dispatch(userLogout());
};

export const updateProfile =
  (id, name, email, password) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/users/profile/${id}`,
        { _id: id, name, email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(updateUserProfile(data));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error has occured.Please try again later"
        )
      );
    }
  };


export const resetUpdateSuccess = () => async(dispatch) => {
  dispatch(resetUpdate());
}