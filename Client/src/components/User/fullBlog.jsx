// import React from "react";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import apiBase from "../utils/api";
// function FullBlog() {
//   const { id } = useParams();
//   // console.log(params)
//   const { isLoading, isError, error } = useQuery({
//     queryFn: async () => {
//       const response = await fetch(`${apiBase}/blogs/${id}`, {
//         credentials: "include",
//       });
//       console.log(response);
//       if (response.ok === false) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }
//       const data = await response.json();
//       // console.log(data);
//       return data;
//     },
//   });
//   if (isLoading) {
//     return <h2>Loading Please wait</h2>;
//   }
//   if (isError) {
//     return <h2>{error.message}</h2>;
//   }
//   return (
//     // style
//     <div>
//       <h1>{data.title}</h1>
//       <p>
//         By {data.user.firstname} {data.user.lastname}
//       </p>
//       <p>Last updated: {new Date(data.updatedAt).toDateString} </p>
//       <p>{data.content}</p>
//     </div>
//   );
// }
// export default FullBlog;

import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiBase from "../utils/api";

function FullBlog() {
  const { id } = useParams();
  // console.log(params)
  const { isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        credentials: "include",
      });
      // console.log(response);

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
  });

  // Loading state
  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  // Error state
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // Render the content if data is successfully fetched
  return (
    // style
    <div>
      <h1>{data.title}</h1>
      <p>
        By {data.user.firstname} {data.user.lastname}
      </p>
      <p>Last updated: {new Date(data.updatedAt).toDateString()}</p>
      <p>{data.content}</p>
    </div>
  );
}

export default FullBlog;
