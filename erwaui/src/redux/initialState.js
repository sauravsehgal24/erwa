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
        color:null
    },
    activePage:{
        title:"Enterprise Expense Tracking"
    },
    userInfo:{
        role:null,
        email:null,
        accessToken:null,
    }
};



export default initialState