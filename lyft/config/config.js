var CONFIG_PORT = parseInt((process.env.CONFIG_PORT || 1455), 10);
if (isNaN(CONFIG_PORT)) {
  console.log('invalid port:', CONFIG_PORT);
  process.exit(1);
}

var CONFIG_USE_SANDBOX = (
  process.env.CONFIG_USE_SANDBOX === false ||
  process.env.CONFIG_USE_SANDBOX === 'false'
) ? false : true;

module.exports = {
  GOOGLE_API_KEY:     process.env.CONFIG_GOOGLE_API_KEY     || 'AIzaSyAPn3z-8ixvGSXGPxUVP3anBdH20cr-GCE',
  LYFT_API_URI:       process.env.CONFIG_LYFT_API_URI       || 'https://api.lyft.com',
  LYFT_WWW_URI:       process.env.CONFIG_LYFT_WWW_URI       || 'https://www.lyft.com',
  LYFT_CLIENT_ID:     process.env.CONFIG_LYFT_CLIENT_ID     || 'A3r1r592DxzI',
  LYFT_CLIENT_SECRET: process.env.CONFIG_LYFT_CLIENT_SECRET || 'Ab3ocWwJJ191P4RElP3XoXtc03kNhOSM',
  PORT:               CONFIG_PORT,
  SESSION_SECRET:     process.env.CONFIG_SESSION_SECRET     || 'secret',
  USE_SANDBOX:        CONFIG_USE_SANDBOX
};
