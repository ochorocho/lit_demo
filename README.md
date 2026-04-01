#  Use Lit in the TYPO3 Backend 

## Install

Given you have already set up the TYPO3 Core using
[bmack/tryout](https://github.com/bmack/tryout) only the following
steps are required to install EXT:lit_demo:

1. Go into the local repository folder: `cd packages/`
2. Clone the demo repository: `git clone git@github.com:ochorocho/lit_demo.git`
3. Install the extension: `ddev composer req ochorocho/lit-demo:@dev`


## Challenge

### Create a WebComponent to display the weather data

1. Fetch data from the weather API: `https://api.open-meteo.com/v1/forecast?latitude=28.33&longitude=-14.01&hourly=temperature_2m`
2. Loop over the provided `hourly` data (`time`, `temperature_2m`)
3. Create a graph with the collected data

### Query GitHub user stats

1. Fetch your GitHub Users Repo `https://api.github.com/users/{user}/repos?per_page=100&page=1`
2. Loop over the returned repos and collect the 'url'
3. Loop over the collected repo urls and count your commits:
   `https://api.github.com/repos/{user}/{repo}/commits?author={user}&per_page=100&page=1`
4. Dynamically display the data while its retrieved
   e.g. | repo path | commit count |

## Resources

* Lit Docs: https://lit.dev/docs/
* Working with the shadow DOM: https://lit.dev/docs/components/shadow-dom/#accessing-nodes-in-the-shadow-dom
* Component styling: https://lit.dev/docs/components/styles/
* Lifecycle https://lit.dev/docs/components/lifecycle/