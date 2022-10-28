import store from "../store";

export default (to, from, next) => {
  if (!store.getters.admin) {
    next({
      path: "/signin",
    });
  } else {
    next();
  }
};
