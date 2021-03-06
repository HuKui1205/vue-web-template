import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); 

const whiteList = ["/login", "/auth-redirect"]; 

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done(); 
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const { roles } = await store.dispatch("user/getInfo");
          const accessRoutes = await store.dispatch("permission/generateRoutes",roles);
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          window.location.href = 'http://localhost:9527/#/login?redirect=%2F';
          next();
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      window.location.href = 'http://localhost:9527/#/login?redirect=%2F';
      next();
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
