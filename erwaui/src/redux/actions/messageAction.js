export const renderErrMessage = (value) => ({
    type: "ERR",
    payload: value
  });

export const renderWarnMessage = (value) => ({
    type: "WARN",
    payload: value
});

export const hideMessage = (value) => ({
    type: "HIDE_MESSAGE",
    payload: value
});

export {renderErrMessage, renderWarnMessage, hideMessage}