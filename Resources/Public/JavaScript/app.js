import './component/counter.js';

// @todo: Create a WebComponent to display the weather data from
// https://api.open-meteo.com/v1/forecast?latitude=28.33&longitude=-14.01&hourly=temperature_2m

// @todo: Query gitlab.com using GraphQL:
// 1) Fetch your GitHub Users Repo https://api.github.com/users/{user}/repos?per_page=100&page=1
// 2) Loop over the returned repos and collect the 'url'
// 3) Loop over the collected repo urls and count your commits:
//    https://api.github.com/repos/{user}/{repo}/commits?author={user}&per_page=100&page=1
// 4) Dynamically display the data while its retrieved
//    e.g. | repo path | commit count |