const winston = require('winston');
const dayjs = require('dayjs');
const { Adapter } = require('sparkbridge-core');
const ME = require('./package.json');
const CFGHelper = require('./handles/cfghelper');
let today = dayjs();

const logger = winston.createLogger({
    format: winston.format.printf((info) => {
        return `${today.format("YYYY-MM-DD h:mm:ss")} [${info.level}] SparkCenter | ${info.message}`
    }),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `./logs/${today.format("YYYY-MM-DD")}.log` })
    ]
});

console.log(`
+ Released under the AGPL-3.0 License
+ Copyright 2023 SparkBridge
+ Version ${ME.version}
`);

logger.info('欢迎使用SparkCenter');
const cfghelper = new CFGHelper('./config.json');
logger.info(`成功加载了${Object.keys(cfghelper.servers).length}个服务器`);
const clientInfo = cfghelper.getClientInfo();
logger.info(`准备使用适配器 ${clientInfo.type} 登入账号 ${clientInfo.qid}`);
const _client = new Adapter(clientInfo.type,clientInfo.qid,clientInfo.platform,clientInfo.log_level,clientInfo.url,"./data/");
logger.info('创建客户端...');
_client.createClient();

