const adminModel = require("../models/admin.model").adminSchema;
const adminService = require("../services/adminService");
const sha256 = require("sha256");
// exports.createAdmin = async (req, res) => {
//   try {
//     let createAdminPayload = {
//         adminName : req.body.adminName,
//         username: req.body.username,
//         password: sha256(req.body.password)
//     }
//     var schemaPayload = new adminModel(createAdminPayload);
//     await schemaPayload
//       .save()
//       .then((response) => {
//         res.status(200).send({
//           message: "Created Admin ",
//           status: true,
//         });
//       })
//       .catch((error) => {
//         res.status(500).send({
//           message:
//             error.message ||
//             "Some error occurred while adding.",
//         });
//       });
//   } catch (error) {
//     res.status(500).send({ errorMessage: err.message });
//   }
// };
