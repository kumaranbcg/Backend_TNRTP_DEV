const multer = require("multer");
const path = require("path");
docUpload = async (req, res, next) => {
	const storage = multer.diskStorage({
		// local Storage
		destination: (req, file, cb) => {
			cb(null, "./public/uploads/");
		},
		filename: function (req, file, cb) {
			const filename =
				file.fieldname + "-" + Date.now() + path.extname(file.originalname).toLocaleLowerCase();
			let url = `${req.protocol}://${req.get("host")}/public/uploads/${filename}`;
			if (!req.body.documentUrls) {
				req.body.documentUrls = [];
			}
			req.body.documentUrls.push({
				url,
				originalname: file.originalname,
			});
			cb(null, filename);
		},
	});

	const filter = (req, res, file, cb) => {
		if (
			path.extname(file.originalname).toLowerCase() === ".pdf" ||
			path.extname(file.originalname).toLowerCase() === ".jpg" ||
			path.extname(file.originalname).toLowerCase() === ".png" ||
			path.extname(file.originalname).toLowerCase() === ".jpeg" ||
			path.extname(file.originalname).toLowerCase() === ".docx" ||
			path.extname(file.originalname).toLowerCase() === ".xlsx"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			if (!req.files.errors) {
				req.files.errors = [];
			}
			req.files.errors.push({
				file,
				reason: "Invalid file type.",
			});
		}
	};
	req.files = {};
	multer({
		storage: storage,
		fileFilter: (req, file, cb) => filter(req, res, file, cb),
		limits: { fileSize: 5 * 1024 * 1024 },
	}).any()(req, res, (err) => {
		if (err && err.message) return res.status(400).json({ status: 400, message: err.message }); //only for file too lage
		next();
	});
};
module.exports = docUpload;
