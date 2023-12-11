let API_URL

if (window.location.hostname === "localhost") {
  API_URL = "http://localhost:3000"
} else {
  API_URL = "https://mood-mental-health.vercel.app"
}

export default API_URL
