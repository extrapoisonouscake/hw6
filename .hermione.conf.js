module.exports = {
  sets: {
    desktop: {
      files: "src/test/hermione",
    },
  },
  baseUrl: 'http://localhost:3000/hw/store/',
  browsers: {
    chrome: {
      windowSize:{
        width:1920,
        height:1080
      },
      retry:5,
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
