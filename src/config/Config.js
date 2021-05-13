let config =
{
    'appName'  : 'zendy',
    'NODE_ENV' : process.env.REACT_APP_NODE_ENV,
    'dev'      : process.env.REACT_APP_NODE_ENV === 'development',
    'prod'     : process.env.REACT_APP_NODE_ENV === 'production',
    'test'     : process.env.REACT_APP_NODE_ENV === 'test',
    'debug'    : process.env.REACT_APP_DEBUG || false,
    'baseName' : process.env.REACT_APP_BASENAME || '',
    'api' : process.env.REACT_APP_API,
    'report_api' : process.env.REACT_APP_REPORT_API || process.env.REACT_APP_API,
    'token': (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).accessToken) || '',
    'assetToken': (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).assetAccessToken) || '',
    'version': process.env.REACT_APP_API_VERSION || 'api/v1/',
    'headers': {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).accessToken) || ''}`
    },
    'gaID' : process.env.REACT_APP_GA_ID || 'UA-82642500-5',
    'stripePK': process.env.REACT_APP_stripePK || 'pk_test_AEL7yfcOpRn4OfAISb5Mg0oj',
    'commonHost': process.env.REACT_APP_COMMON_HOST,
    'pusherAppKey': process.env.REACT_APP_PUSHER_APP_KEY,
    'pusherCluster': process.env.REACT_APP_PUSHER_CLUSTER,
    'pusherChannelPrefix': process.env.REACT_APP_PUSHER_CHANNEL_PREFIX
}

config.apiVersion = config.api+config.version;
config.apiReportVersion = config.report_api+config.version;

export default config