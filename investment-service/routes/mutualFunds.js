const express = require("express");
const axios = require("axios")
const router = express.Router();


// Function to fetch data from the API
const fetchData = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data

  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    throw error
  }
}

router.get("/", async (req, res) => {
  const apiUrls = [
    "https://api.mfapi.in/mf/100416/latest",
    "https://api.mfapi.in/mf/100028/latest",
    "https://api.mfapi.in/mf/100044/latest",
    "https://api.mfapi.in/mf/100047/latest",
    "https://api.mfapi.in/mf/100082/latest",
    "https://api.mfapi.in/mf/100173/latest",
    "https://api.mfapi.in/mf/100080/latest",
    "https://api.mfapi.in/mf/100219/latest",
    "https://api.mfapi.in/mf/100234/latest",
    "https://api.mfapi.in/mf/100183/latest",
  ]

  try {
    const apiResponses = await Promise.all(apiUrls.map(fetchData));
    const formattedResponses = apiResponses.map(response => ({
      meta: response.meta,
      data: response.data.map(item => ({
        date: item.date,
        nav: item.nav
      })),
    }));
    console.log(formattedResponses);
    

    res.render("home", { apiResponses: apiResponses });
  } catch (error) {
    console.error("Error fetching data from API: ", error.message);
    res.status(500).send('Internal Server Error');
  }

});

// Export router module for use in application
module.exports = router;
