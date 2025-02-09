
const env = process.env.REACT_APP_ENV

const config = {
    local:{
        apiConfig:{
            baseURL:"http://localhost:8000/v1"
        }
    },
    dev:{
        apiConfig:{
            baseURL:"http://localhost:8000/v1"
        }
    }
}
export default config[env]
