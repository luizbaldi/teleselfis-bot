/* Config */
import { factoryBot } from './config/botConfig';

/* Controllers */
import { startBotListeners } from './controller/botController';

/* Bot and server instances */
const bot = factoryBot();

/* Start bot event listeners */
startBotListeners(bot);