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
      START_MESSAGE: "I'm thinking of a number between 1 and 10.",
      PLAY_MESSAGE: "Guess a number.",
      TOO_HIGH_MESSAGE: "My number is lower than ",
      TOO_LOW_MESSAGE: "My number is higher than ",
      GUESS_AGAIN_MESSAGE: "Guess again",
      CORRECT_MESSAGE: "You're correct, the number was ",
      WIN_MESSAGE_PREFIX: "You've won ",
      WIN_MESSAGE_POSTFIX: " games.",
      PLAY_AGAIN_MESSAGE: "Want to play again?",
      HELP_MESSAGE: "You can ask to play the game or say stop.",
      HELP_REPROMPT: "What would you like to do?",
      STOP_MESSAGE: "Let's play again soon.",
      UNKNOWN_MESSAGE: "Sorry, I didn't catch that, guess again.",
    }
  }
};

const randomNumber = function (min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

const handlers = {
  'NewSession': function () {
    this.emit('Play');
  },
  'SessionEndedRequest': function () {
    this.attributes.num = undefined;
    this.emit(':tell', this.t("STOP_MESSAGE"));
  },
  // 'LaunchRequest': function () {
  //   this.emit('Play');
  // },
  'Play': function () {
    this.attributes.num = randomNumber(1, 10);
    this.emit(':ask', this.t("START_MESSAGE"), this.t("PLAY_MESSAGE"));
  },
  'Guess': function () {
    const slots = this.event.request.intent.slots;
    const guess = slots["number"].value;

    const num = this.attributes.num;
    if (num == undefined) {
      this.emit('NotPlaying');
    }
    if (guess == num) {
      this.attributes.num = undefined;
      this.emit(':ask', this.t("CORRECT_MESSAGE") + guess + ". " + this.t('PLAY_AGAIN_MESSAGE'));
    } else if (guess < num) {
      this.emit(':ask', this.t("TOO_LOW_MESSAGE") + guess + ". " + this.t("GUESS_AGAIN_MESSAGE"));
    } else {
      this.emit(':ask', this.t("TOO_HIGH_MESSAGE") + guess + ". " + this.t("GUESS_AGAIN_MESSAGE"));
    }
  },
  'NotPlaying': function () {
    this.emit(':ask', this.t("PLAY_AGAIN_MESSAGE"));
  },
  'AMAZON.YesIntent': function () {
    this.emit('Play');
  },
  'AMAZON.NoIntent': function () {
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', this.t("HELP_MESSAGE"), this.t("HELP_REPROMPT"));
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', this.t("STOP_MESSAGE"));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', this.t("STOP_MESSAGE"));
  },
  'Unhandled': function () {
    this.emit(':ask', this.t("UNKNOWN_MESSAGE"));
  },
};
