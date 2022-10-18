export const getErrorMsg = (error: any) => {
  if (error.response && error.response.data) {
    return {
      ...error.response.data,
      message: error.response.data.message || error.response.data.error,
    };
  }
  if (error.message) {
    return { message: error.message, status: null };
  }
  return { message: "Unknown Error.", status: null };
};
