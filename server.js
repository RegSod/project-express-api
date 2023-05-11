import express from "express";
import cors from "cors";
import antiqueObjects from "./data/antiqe-objects.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/antiques", (req, res) => {
  const antiques = antiqueObjects;
  if (antiques) { 
 res.status(200).json({
   success: true,
   message: "OK",
   body: {
    antiqueObjects: antiques
 } 
});
}
  else 
{ 
  res.status(500).json({
    success: false,
    message: "I'm sorry, something went wrong",
    body: {}
 
  }); 
}
});

app.get("/antiques/:id", (req, res) => {
  const singleAntiqe = antiqueObjects.find((antiqe) => {
    const { id } = req.params;
    return antiqe._id === Number(id);
  });
  if (singleAntiqe) { 
 res.status(200).json({
   success: true,
   message: "OK",
   body: {
    antique: singleAntiqe
 } 
});
}
  else 
{ 
  res.status(404).json({
    success: false,
    message: "I'm sorry, the item you are looking for is not found here",
    body: {}
 
  }); 
}
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
