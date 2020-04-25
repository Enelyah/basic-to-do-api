const mongoose = require("mongoose");
const Task = require("../models/task");

Task.collection.drop();

const dbtitle = "todolistapi";
mongoose.connect(`mongodb://localhost/${dbtitle}`);

const tasks = [
  {
    title: "Stay home",
    description: "Like, your home. Not like your neighbour's home at lunch and your friend's home at dinner.",
    priority: "high"
  },

  {
    title: "Keep your distance",
    description: "6 feet distance. That's about 6 Domino's pizza boxes.",    
    priority: "low"
  },

  { 
    title: "E-Socialize", 
    description: "Leave Netflix a second and dial in.",
    priority: "medium"
  },

  { 
    title: "Wash hands", 
    description: "Yes, that means water AND soap",     
    priority: "medium"
  },

  {
    title: "Wear mask",
    description: "Preferably not cut out of an old bra. Teeshirts work. Socks too, apparently.",
    priority: "high"
  },
]; 


Task.create(tasks)
  .then((tasks) => {
    console.log(`${tasks.length} tasks created.`);
    mongoose.connection.close();
      })
      .catch((err) => console.error(err));
