import axios from "axios";
const BASEURL = import.meta.env.VITE_SOME_KEY;

const newRequest = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export default newRequest;
