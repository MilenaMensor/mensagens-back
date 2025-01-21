import express from "express"; 
import routes from "./src/routes/msgRoutes.js";

const app = express();
routes(app);

// Inicia um servidor na porta e devolve no console a mensagem
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
