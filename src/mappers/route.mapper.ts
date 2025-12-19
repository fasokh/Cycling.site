import { Route } from "../types/route";
import { RouteCardModel } from "../types/ًRouteCardModle";

export const mapRouteToCard = (route: Route): RouteCardModel => {
  return {
    id: route.id,
    name: route.title,
    distance: route.distance,
    description: "-",
    date: route.createdAt.toDate().toLocaleDateString(),
    gpxFile: route.gpxUrl ?? ""
  };
};
