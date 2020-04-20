module.exports = `query ($userID: String!) {
    user(login: $userID) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
          }
          totalContributions
        }
      }
    }
  }`;
