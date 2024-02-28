![Please-enter-a-title_-001](https://user-images.githubusercontent.com/87453411/228857059-6f2f4c79-bacf-43e0-b6da-6bb58c26abd1.png)

# Project JAMGUN(Job Application Machine Gun)

- What : Sellenium-based job applying program
- What is that character : the character symbolize artillery soldier squirrel
- Why : To collect job posting statistic data(+and automate job application)
- Target : job platform([Jumpit](https://www.jumpit.co.kr/), [Intellipick](https://intellipick.spartacodingclub.kr/)) in South Korea

## News

- 2023-03-29 : basic scraping func success
- 2023-03-30 : target site added(JUMPIT).

## Troubleshooting

- scraping only limited number(60) of data not everything(2023-03-30) -> solved by changing while loop condition
- final df shows nothing(2023-03-30) -> fixed with removing duplicated initiating codes

## Who need this?

- Job seekers who want to automate applying job
- Researcher who want to get job post statistics in the job platform

## What can I do

- You can automate job application tasks(2023-03-30, Intellipick, Jumpit)
- You can get summary about jobs you applied in CSV file at `/data` directory.

![Screenshot 2023-04-01 at 4 30 05 AM](https://user-images.githubusercontent.com/87453411/229212130-151fb54c-2ff8-480a-b936-ed6155032936.jpg)

## Check this out before using

### robots.txt

check '<target-website>/robots.txt' if scraping target page is allowed.

### set environment file

create `.env` file in root directory and put your id, pw like below.

```
SPARTA_ID=<your-email>
SPARTA_PASSWORD=<your-password>
JUMPIT_ID=<your-email>
JUMPIT_PASSWORD=<your-password>
SLACK_WEBHOOK_URL=<your-slack-url>
```

### get proper driver

If driver-related problem occurs, make sure to use proper chromedriver. In this root directory, you will find chromedriver for mac arm64.

Check driver that fits your browser's version(https://chromedriver.chromium.org/)
