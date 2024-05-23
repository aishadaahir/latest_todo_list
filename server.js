const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://aisha:siddiiq@cluster1.gzwuabs.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
//DATABASE
const tasks = [
  {
    title: "Kitty 3",
    status: "incomplete",
  },
  {
    title: "Kitty 1",
    status: "complete",
  },
  {
    title: "Kitty 4",
    status: "incomplete",
  },
];
const tasksSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    status: { type: String, require: true },
  },
  {
    timestamps: true,
  },
  { collection: "todolisttask" }
);

const task = mongoose.model("task", tasksSchema);

// tasks.forEach((data) => {
//   const newTask = new task({
//     title: data.title,
//     status: data.status,
//   });

//   newTask.save();
// });

app.get("/", (req, res) => {
  task
    .find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.post("/add", async (req, res) => {
  const kudar = await task({
    title: req.body.title,
    status: req.body.status,
  });
  await kudar.save();
  res.send("Saved Successfully");
});

app.put("/update/:id", async (req, res) => {
  task
    .findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          title: req.body.title,
          status: req.body.status,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        update: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        Error: err,
      });
    });
});

app.put("/updatech/:id", async (req, res) => {
  task
    .findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          status: req.body.status,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        update: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        Error: err,
      });
    });
});

app.delete("/delete/:id", async (req, res) => {
  task
    .remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Data deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        Error: err,
      });
    });
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});
