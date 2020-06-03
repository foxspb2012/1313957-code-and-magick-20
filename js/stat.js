'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var STEP = 5;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BORDER_PADDING = 20;

var evenStep = function isEvenStep(step) {
  return step % 2;
};

var renderCloud = function (ctx, x, y, w, h, s, color) {
  var maxWidth = x + w;
  var maxHeight = y + h;
  var step = 1;
  var ord = y;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);

  for (var abs = x + 10; maxWidth >= abs; abs += 10) {
    ord = (evenStep(step) ? (y - s) : (y));
    ctx.lineTo(abs, ord);
    step = step + 1;
  }

  step = 1;
  for (ord = y + 10; maxHeight >= ord; ord += 10) {
    abs = (evenStep(step) ? (maxWidth + s) : (maxWidth));
    ctx.lineTo(abs, ord);
    step = step + 1;
  }

  step = 1;
  for (maxWidth; maxWidth >= x; maxWidth -= 10) {
    ord = (evenStep(step) ? (maxHeight + s) : (maxHeight));
    ctx.lineTo(maxWidth, ord);
    step = step + 1;
  }

  step = 1;
  for (maxHeight; maxHeight >= y; maxHeight -= 10) {
    abs = (evenStep(step) ? (x - s) : (x));
    ctx.lineTo(abs, maxHeight);
    step = step + 1;
  }

  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var sortData = function (data, index) {
  var swap = data[0];
  data[0] = data[index];
  data[index] = swap;

  return data;
};

var getIndex = function (players) {
  var returnIndex = 0;
  for (var i = 0; i <= players.length - 1; i++) {
    if (players[i] === 'Вы') {
      returnIndex = i;
      break;
    }
  }
  return returnIndex;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, STEP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, STEP, '#fff');

  ctx.fillStyle = '#000';

  renderText(ctx, 'Ура, вы победили!', CLOUD_X + BORDER_PADDING, CLOUD_Y + BORDER_PADDING);
  renderText(ctx, 'Список результатов:', CLOUD_X + BORDER_PADDING, CLOUD_Y + 2 * BORDER_PADDING);

  var maxTime = getMaxElement(times);

  var yoursIndex = getIndex(players);

  var playersArray = sortData(players, yoursIndex);

  var timesArray = sortData(times, yoursIndex);

  for (var i = 0; i < playersArray.length; i++) {
    ctx.fillStyle = 'hsl(240, 100%, ' + Math.round((Math.random() * 100)) + '%)';
    if (playersArray[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(CLOUD_X + BORDER_PADDING * 2 + (BAR_GAP + BAR_WIDTH) * i, 95 + BAR_MAX_HEIGHT - Math.round((BAR_MAX_HEIGHT * timesArray[i]) / maxTime), BAR_WIDTH, Math.round((BAR_MAX_HEIGHT * timesArray[i]) / maxTime));

    renderText(ctx, playersArray[i], CLOUD_X + BORDER_PADDING * 2 + (BAR_GAP + BAR_WIDTH) * i, BORDER_PADDING * 4.75 + BAR_MAX_HEIGHT + GAP);

    renderText(ctx, Math.round(timesArray[i]), CLOUD_X + BORDER_PADDING * 2 + (BAR_GAP + BAR_WIDTH) * i, BORDER_PADDING * 4.75 + BAR_MAX_HEIGHT - Math.round((BAR_MAX_HEIGHT * timesArray[i]) / maxTime) - BORDER_PADDING);
  }
};
