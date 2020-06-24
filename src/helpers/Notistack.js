export const Noti_Success = (enqueueSnackbar, message) => {
    enqueueSnackbar(message, { variant: "success" });
};

export const Noti_Error = (enqueueSnackbar, message) => {
    enqueueSnackbar(message, { variant: "error" });
};
