const mongoose = require("mongoose");
const Task = require("../models/task");

Task.collection.drop();

const dbtitle = "todolistapi";
mongoose.connect(`mongodb://localhost/:27017/${dbtitle}`);

const tasks = [
  {
    title: "Stay home",
    description: "Like, your home. Not like your neighbour's home at lunch and your friend's home at dinner.",
  },

  {
    title: "Keep your distance",
    description: "6 feet distance. That's about 6 Domino's pizza boxes.",
  },

  { title: "E-Socialize", 
  description: "Leave Netflix a second and dial in." },

  { title: "Wash hands", 
  description: "Yes, that means water AND soap" },

  {
    title: "Wear mask",
    description: "Preferably not cut out of an old bra. Teeshirts work. Socks too, apparently.",
  },
]; 


Task.create(tasks)
  .then((tasks) => {
    console.log(`${tasks.length} tasks created.`);
    mongoose.connection.close();
      })
      .catch((err) => console.error(err));
