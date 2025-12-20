import { Timestamp } from "firebase/firestore";
import { Route } from "../types/route";
import { RouteCardModel } from "../types/ًRouteCardModle";

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
    name: route.title,
    distance: route.distance,
    description: "-",
    gpxFile: route.gpxUrl ?? "",
    date,
  };
};
