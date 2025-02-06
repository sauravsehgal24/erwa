
const env = process.env.REACT_APP_ENV

const config = {
    local:{
        apiConfig:{
            baseURL:"http://localhost:8000"
        }
    },
    dev:{
        apiConfig:{
            baseURL:"http://localhost:8000"
        }
    }
}
export default config[env]
