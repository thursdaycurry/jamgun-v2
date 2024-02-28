![jamgun-v2](https://github.com/thursdaycurry/jamgun-v2/assets/87453411/ee9b6698-65b8-4fc5-87d4-4421a87c409e)

# JAMGUN-v2

Project title : JAMGUN(Job-application Automation Machine Gun)

JAMGUN-v2은 puppeteer 기반 입사지원(Job-application) 자동화 프로그램입니다.

background

- 기존 JAMGUN-v1은 파이썬 기반 Selenium으로 개발되었으나, 해당 라이브러리가 가진 explicitWait 함수의 복잡한 적용 방식 등 불편한 개발 경험을 고려하여 Puppeteer로 이전되었다.

Target platform

- South Korea : [Jumpit](https://www.jumpit.co.kr/)

## Function

- You can automate job application tasks(2023-03-30, Intellipick, Jumpit)
- You can get summary about jobs you applied in CSV file at `/data` directory.

## environments

```
node : v21.6.1
dotenv : 16.4.5
puppeteer : 22.3.0
```

.env

```
JUMPIT_EMAIL=<your-email>
JUMPIT_PASSWORD=<your-password>
JUMPIT_TARGET_URL=<target-url>

SLACK_WEBHOOK_URL=<your-slack-url>
```

## Architecture

Jamgun v1 Architecture
![Screenshot 2023-04-01 at 4 30 05 AM](https://user-images.githubusercontent.com/87453411/229212130-151fb54c-2ff8-480a-b936-ed6155032936.jpg)

## Logo

Logo created by Leonardo.AI

Prompt

```
You are a professional cartoon illustrator. I will give you a description of the picture and you will draw it. The character description is a cute chubby, fluffy squirrel character wearing a small hat and holding a telescope, facing right. The colours are black and white, and the drawing is done in a classic American style, clean and uncluttered, but with a hand-drawn look. The squirrel character is cute, but has big, sparkling eyes. I want you to draw his pupils big and add sparkles to his eyes to give him a sense of madness. The squirrel is facing to the right.
```
