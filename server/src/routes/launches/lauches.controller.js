const { getAllLaunches, addNewLaunch, existLaunchWitId, abortLauchById } = require('../../models/launches.model');
const launchesRouter = require('./lauches.router');

function httpGetAllLaunches(req,res) {
  res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  
  if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
    return res.status(400).json({
      error: "Missing required launch property"
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date"
    })
  }

  addNewLaunch(launch);
  res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existLaunchWitId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found'
    });

  }

  const aborted = abortLauchById(launchId);
  res.status(200).json(aborted)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}
