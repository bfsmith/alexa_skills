import * as A from 'alexa-sdk';
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

export const handler = function (event, context, callback) {
  var alexa = A.handler(event, context);
  alexa.appId = APP_ID;
  (<any>alexa).resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
const languageStrings = {
  "en": {
    "translation": {
      HELP_MESSAGE: "You can ask flip a coin, roll a die or get a random number.",
      HELP_REPROMPT: "What can I help you with?",
      STOP_MESSAGE: [
        "So long.",
        "Goodbye",
        "Bye bye",
        "Farewell"
      ],
    }
  }
};

const randomNumber = function (min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

const randomEntry = function<T>(entries: T[]): T {
  if (entries.length == 0) {
    return undefined;
  }
  const index = Math.floor(Math.random() * entries.length);
  return entries[index];
}

const handlers = {
  'LaunchRequest': function () {
    this.emit('AMAZON.HelpIntent');
  },
  'FlipCoin': function () {
    const coin = Math.random() < .5 ? 'heads' : 'tails';
    this.emit(':tell', `You flipped ${coin}.`);
  },
  'RollDie': function () {
    const num = randomNumber(1, 6);
    this.emit(':tell', `You rolled a ${num}.`);
  },
  'RandomNumber': function () {
    const num = randomNumber(0, 100);
    this.emit(':tell', `You got ${num}.`);
  },
  'AMAZON.HelpIntent': function () {
    var speechOutput = this.t("HELP_MESSAGE");
    var reprompt = this.t("HELP_REPROMPT");
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', randomEntry(this.t("STOP_MESSAGE")));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', randomEntry(this.t("STOP_MESSAGE")));
  }
};