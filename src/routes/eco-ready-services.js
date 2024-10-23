import express from "express";
import Sentry from "@sentry/node";

import { CollectionDataManagement } from "../utils/index.js";

const router = express.Router({ mergeParams: true });

router.get("/getdata", async (req, res) => {
	try {
		const { organization, project, collection, accessKey, params } = req.query;
		// console.log('Params in endpoint', params)
		const response = await CollectionDataManagement.getData(organization, project, collection, accessKey, params);
		return res.json(response);
	} catch (error) {
		Sentry.captureException(error);
		return res.status(500).json({ message: "Something went wrong." });
	}
});

router.get("/getdatastatistics", async (req, res) => {
	// const organization = 'living_lab_agro';
	// const project = 'irrigation';
	// const collection = 'sensors_data';
	// const accessKey = '******';
	try {
		const { organization, project, collection, accessKey } = req.query;
		const response = await CollectionDataManagement.getDataStatistics(organization, project, collection, accessKey);
		return res.json(response);
	} catch (error) {
		Sentry.captureException(error);
		return res.status(500).json({ message: "Something went wrong." });
	}
});

export default router;
