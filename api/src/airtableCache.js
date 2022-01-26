const axios = require("axios");

class AirtableCache {
	constructor(url, key) {
		this.url = url;
		this.key = key;
		this.data = [];
	}

	async triggerUpdate() {
		const headers = {
			Authorization: `Bearer ${this.key}`,
			// "Content-Type": "application/json",
		};
		const res = [];

		try {
			let offset = 0; // no initial offset, explicitely set to 0

			while (offset !== undefined) {
				const params = {
					offset: offset,
					view: "OPEN - Public Content - All 🔗",
				};
				await axios
					.get(this.url, { params, headers })
					.then((response) => {
						offset = response.data.offset;
						const records = response.data.records.map(
							({ fields }) => JSON.parse(JSON.stringify(fields))
						);
						res.push(...records);
					});
			}
		} catch (error) {
			console.error(error);
		}

		this.data = res;
	}
}

module.exports = AirtableCache;
