const db = require("../models");
const router = require("express").Router();

//get workouts

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkOut) => {
      dbWorkOut.forEach((workout) => {
        let total = 0;
        workout.exercises.forEach((e) => {
          total += e.duration;
        });
        workout.totalDuration = total;
      });
      res.json(dbWorkOut);
    })
    .catch((err) => {
      res.json(err);
    });
});

// add exercises

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $inc: {
        totalDuration: req.body.duration,
      },
      $push: { exercises: req.body },
    },

    { new: true }
  )
    .then((dbWorkOut) => {
      res.json(dbWorkOut);
    })
    .catch((err) => {
      res.json(err);
    });
});

//create a workout

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkOut) => {
      res.json(dbWorkOut);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get range of workouts

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((dbWorkOut) => {
      res.json(dbWorkOut);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
