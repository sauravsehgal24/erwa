const renderErrMessage = (value) => ({
    type: "ERR",
    payload: value
  });

const renderWarnMessage = (value) => ({
    type: "WARN",
    payload: value
});

const renderSuccessMessage = (value) => ({
    type: "SUCCESS",
    payload: value
});

const hideMessage = (value) => ({
    type: "HIDE_MESSAGE",
    payload: value
});

export {renderErrMessage, renderWarnMessage, hideMessage, renderSuccessMessage}