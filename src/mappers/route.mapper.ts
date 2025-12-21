import { Timestamp } from "firebase/firestore";
import { Route } from "../types/route";
import { RouteCardModel } from "../types/routeCardModel";

export const mapRouteToCard = (route: Route): RouteCardModel => {
  let date = "";

  if (route.createdAt instanceof Timestamp) {
    date = route.createdAt.toDate().toLocaleDateString();
  } else if (route.createdAt instanceof Date) {
    date = route.createdAt.toLocaleDateString("fa-IR");
  } else if (typeof route.createdAt === "string") {
    date = route.createdAt;
  }

  return {
    id: route.id,
    name: route.name,
    distance: route.distance,
    description: route.description,
    gpxFile: route.gpxFile ?? "",
    date,
  };
};
