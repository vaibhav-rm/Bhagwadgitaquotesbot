# QuoteBot [![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()[![Github All Releases](https://img.shields.io/github/downloads/atom/atom/total.svg)]() [![node](https://img.shields.io/node/v/gh-badges.svg)]()![ForTheBadge](http://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)

A discord bot that outputs a random quote upon command

# Setup

1. Install Dependencies
a. install node.js if you don't already have it
b. `npm install discord.js`
c. `npm install discord.js`
d. `npm install infinite-loop`
2. Clone the project (`git clone https://github.com/EpicDJL/QuoteBot.git`)
3. Edit the config file
a. put the prefix and command of your choice
```json
{
    "prefix": "!",
    "command": "quote",
```
(This makes the command !quote)
b. create a bot account on https://discordapp.com/developers/applications/me
VIDEO
c. copy the "token" and paste it into the config file
```json
{
    "token": "right here :)"
```
d. format the quotes so that they each are a seperate line
```
quote 1
quote 2
quote 3
(no quotations)
```
e. got to http://textmechanic.com/text-tools/basic-text-tools/add-prefixsuffix-into-line/ and paste your quotes into the text box
f. put `"` in the prefix box and `",` into the suffix box, this shoud format your quotes like this
```
"quote 1",
"quote 2",
"quote 3",
```
