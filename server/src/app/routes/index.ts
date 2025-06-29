import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { groupRoutes } from "../modules/groups/group.routes";
import { reviewRoutes } from "../modules/reviews/review.routes";
import { subscriptionRoutes } from "../modules/subscription/subscription.routes";

const router: Router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/groups",
    route: groupRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
  {
    path: "/subscriptions",
    route: subscriptionRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export const applicationRoutes = router;
