const {Router} = require("express");
const {authMiddleware} = require("../middleware/authMiddleware");
const authCtrl = require("../controllers/authController");
const formsCtrl = require("../controllers/formController");
const submitCtrl = require("../controllers/submitController");
const repositoryCtrl = require("../controllers/repositoryController");
const dashboardCtrl = require("../controllers/dashboardController");
const routes = Router();

routes.post("/auth/login", authCtrl.__logIn_Post);
routes.post("/auth/signup", authCtrl.__signUp_Post);
routes.post("/auth/logout", authCtrl.__logOut_Post);

routes.get("/dashboard", dashboardCtrl.__dashboard_Get);

routes.get("/forms", authMiddleware, formsCtrl.__form_fetch_Get);
routes.post("/forms", authMiddleware, formsCtrl.__form_Post);
routes.patch("/forms/builder/:id", authMiddleware, formsCtrl.__form_save_Patch);
routes.get(
  "/forms/builder/:id",
  authMiddleware,
  formsCtrl.__form_getStructure_Get
);
routes.put("/forms/builder/:id", authMiddleware, formsCtrl.__form_publish_Put);
routes.get("/submit/:formName/:id", submitCtrl.__form_submit_Get);
routes.post("/submit/:formName/:id", submitCtrl.__form_submit_Post);

routes.get("/repository", repositoryCtrl.__repository_fetchAll);
routes.get("/repository/:id", repositoryCtrl.__repository_fetch);

module.exports = routes;
