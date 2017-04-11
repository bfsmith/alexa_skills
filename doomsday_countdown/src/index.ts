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
      TIME_MESSAGE: "It's currently two and a half minutes until midnight.",
      HELP_MESSAGE: "The doomsday clock symbolizes how close we are to a human caused catastrophe. It is measured in minutes until midnight, the moment of the catastrophe.",
      HELP_REPROMPT: "Would you like to know the time?",
      STOP_MESSAGE: "Good luck.",
    }
  }
};

const handlers = {
  'LaunchRequest': function () {
    this.emit('TheTime');
  },
  'AMAZON.YesIntent': function () {
    this.emit('TheTime');
  },
  'TheTime': function () {
    this.emit(':tell', this.t('TIME_MESSAGE'));
  },
  'AMAZON.HelpIntent': function () {
    var speechOutput = this.t("HELP_MESSAGE");
    var reprompt = this.t("HELP_REPROMPT");
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', this.t("STOP_MESSAGE"));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', this.t("STOP_MESSAGE"));
  }
};