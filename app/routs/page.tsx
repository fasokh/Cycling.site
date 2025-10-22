// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/src/firebase/firebaseConfig";
// import { NextPage } from "next";
// import React, { useEffect, useState } from "react";

// interface Route {
//   id: string;
//   name: string;
//   distace: string;
//   date: number;
//   gpxFile: string;
// }

// const Routspage: NextPage = () => {
//   const [routs, setRouts] = useState<Route[]>();

//   useEffect(() => {
//     const fetchRoutes = async () => {
//       const querySnapshot = await getDocs(collection(db, "routs"));
//       const data: Route[] = querySnapshot.docs.map(
//         (doc) =>
//           ({
//             id: doc.id,
//             ...doc.data(),
//           } as Route)
//       );
//       setRouts(data);
//     };
//     fetchRoutes();
//   }, []);

//   return (
//     <div>
//       <h2>مسیرهای من</h2>
//       <ul>
//         {routs?.map((rout) => (
//           <li key={rout.id}>
//             {rout.name} {rout.date} {rout.distace} km
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Routspage;
