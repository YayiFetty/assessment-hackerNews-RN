import axios from 'axios';

const hackerUrl = "https://hacker-news.firebaseio.com/v0";

const NewsApiCall = async (endpoint) => {
  const url = `${hackerUrl}/${endpoint.replace(/^\/+/, "")}`; // Remove leading slashes
  const options = {
    method: "GET",
    url: url,
  };
  
  try {
    const response = await axios(options);
    console.log("Api response", response.data);
    return response.data;
  } catch (error) {
    console.error("error fetching news", {
      message: error.message,
      status: error.response ? error.response.status : "No response status",
      data: error.response ? error.response.data : "No response data",
    });
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const fetchAllStories = async () => {
  const storyIds = await NewsApiCall("topstories.json?print=pretty");
  const stories = await Promise.all(
    storyIds.slice(0, 20).map(id => NewsApiCall(`item/${id}.json`))
  );
  return stories;
};