// import { create } from "@mui/material/styles/createTransitions";
// import { apiHandler } from "../../../../server/helpers/api-handler";
// import { allowedMethod, NoData, ServerError, Success } from "../../../../server/helpers/requestValidators";
// import { getUser } from "../../../../server/helpers/get-user";

// export default apiHandler(handler);

// async function handler(req, res) {
//   // const {user} = await getUser(req);

//   allowedMethod(req, res, "POST");

//   NoData(req, res);

//   try {
//     const result = await create(req.body, user);
//     Success(res, result);
//   } catch (error) {
//     return ServerError(res);
//   }
// }
