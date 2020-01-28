'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_OFFSET = 10;
var MESSAGE_FONT = '16px PT Mono';
var TEXT_OFFSET = 30;
var TEXT_LINE_HEIGHT = 20;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 50;
var USER_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_DISTANCE = 50;
var BAR_START_X = 130;
var BAR_START_Y = 250;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomBlueColor = function () {
  var saturation = Math.floor(Math.random() * 100);
  var color = 'hsl(251, ' + saturation + '%, 49%)';
  return color;
};

var renderBar = function (ctx, color, xOffset, barHeight, playerName, playerScore) {
  ctx.fillStyle = color;
  ctx.fillRect(BAR_START_X + xOffset, BAR_START_Y, BAR_WIDTH, -barHeight);
  ctx.fillStyle = '#000000';
  ctx.fillText(playerName, BAR_START_X + xOffset + 5, BAR_START_Y + 20);
  ctx.fillText(playerScore, BAR_START_X + xOffset + 5, BAR_START_Y - barHeight - 10);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.fillStyle = '#000000';
  ctx.font = MESSAGE_FONT;
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET + TEXT_LINE_HEIGHT);

  var maxTime = Math.max.apply(null, times);
  var proportion = MAX_BAR_HEIGHT / maxTime;

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      var barColor = USER_COLOR;
    } else {
      barColor = getRandomBlueColor();
    }
    renderBar(ctx, barColor, BAR_DISTANCE * i * 2, proportion * times[i], names[i], Math.round(times[i]));
  }
};
