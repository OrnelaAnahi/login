import log4js from 'log4js'
// LOGGER

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miWarnFile: { type: "file", filename: "warn.log" },
    warnFileLevel: { type: 'logLevelFilter', appender: 'miWarnFile', level: 'warn' },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "info" },
    logs: { appenders: ["warnFileLevel", "miLoggerConsole"], level: "all" },
  },
})