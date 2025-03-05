const { app } = require("./app.js");
const { PORT } = require("./src/config/config.js");

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
