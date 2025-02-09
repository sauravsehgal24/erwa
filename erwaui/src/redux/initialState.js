const initialState = {
    appProperties:{
        appNameAcr: "ERWA",
        appName: "Enterprise Expense Reporting Web App",
        loading:false
    },
    appMessage:{
        active:false,
        type:null, //err warn
        message: "This is a warning message",
    },
    activePage:{
        title:"Enterprise Expense Tracking"
    },
    userInfo:{
        username:null,
        role:null,
        email:null,
        accessToken:null,
    }
};



export default initialState