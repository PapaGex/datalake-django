
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectLoginFailed = (state) => state.auth.errorMessage;