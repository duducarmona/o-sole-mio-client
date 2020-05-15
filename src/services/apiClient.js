import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  login(body) {
    return this.apiClient.post('/login', body);
  }

  signup(body) {
    return this.apiClient.post('/signup', body);
  }

  logout() {
    return this.apiClient.get('/logout');
  }

  whoami() {
    return this.apiClient.get('/whoami');
  }

  getProtected() {
    return this.apiClient.get('/protected');
  }

  createTerrace(body) {
    return this.apiClient.post('/terraces', body);
  }

  getAllTerraces() {
    return this.apiClient.get('/terraces');
  }

  deleteTerrace(id) {
    return this.apiClient.delete(`/terraces/${id}`);
  }

  getTerraceDetail(id) {
    return this.apiClient.get(`/terraces/${id}`);
  }

  editTerrace(id, body) {
    return this.apiClient.put(`/terraces/${id}`, body);
  }

  createReview(body) {
    return this.apiClient.post('/reviews', body);
  }

  getReviewsByTerrace(terraceId) {
    return this.apiClient.get(`/reviews/${terraceId}`);
  }

  deleteReview(id) {
    return this.apiClient.delete(`/reviews/${id}`);
  }

  getReviewDetail(id) {
    return this.apiClient.get(`/reviews/${id}/detail`);
  }

  editReview(id, body) {
    return this.apiClient.put(`/reviews/${id}`, body);
  }

  editUser(id, body) {
    console.log('id: ', id);
    
    return this.apiClient.put(`/user/${id}`, body);
  }

  checkCorrectPassword(password, body) {
    return this.apiClient.post(`/checkCorrectPassword/${password}`, body);
  }
}

const apiClient = new ApiClient();
export default apiClient;
