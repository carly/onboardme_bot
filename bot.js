var env = require('node-env-file');
env(__dirname + '/.env');

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');


var bot_options = {
	clientId: process.env.clientId,
	clientSecret: process.env.clientSecret,
	debug: true,
	scopes: ['incoming-webhook','team:read','users:read','channels:read','im:read','im:write','groups:read','emoji:read','chat:write:bot'],
	studio_token: process.env.studio_token,
	studio_command_uri: process.env.studio_command_uri,
	api_root:"https://dev.slack.com",
	redirectUri: 'http://carly.ngrok.io',
	json_file_store: __dirname + '/.data/db/' // store user data in a simple JSON format
};

// Create the Botkit controller, which controls all instances of the bot.
const controller = Botkit.slackbot(bot_options);
controller.startTicking();

// Define Bot
var bot = controller.spawn({
  token: process.env.bot_token
});

var team = bot.identifyTeam();
var identity = bot.identifyBot();


// Server

const server = require(__dirname + '/server.js')(controller);


