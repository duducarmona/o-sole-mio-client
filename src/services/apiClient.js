import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  login(body) {
    return this.apiClient.post("/login", body);
  }

  signup(body) {
    return this.apiClient.post("/signup", body);
  }

  logout() {
    return this.apiClient.get("/logout");
  }

  whoami() {
    return this.apiClient.get("/whoami");
  }

  getProtected() {
    return this.apiClient.get("/protected");
  }

  createTerrace(body) {
    return this.apiClient.post("/terraces", body);
  }
}

const apiClient = new ApiClient();
export default apiClient;
