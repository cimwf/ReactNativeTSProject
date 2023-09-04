export default () => {
    'show source'
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div id="root">123</div>
    </body>
    </html>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
    <script type="text/javascript" src="https://www.cmpassport.com/h5/js/jssdk_auth/jssdk-1.0.0.min.js"></script>
    <script type="text/javascript">
        window.ReactNativeWebView.postMessage('123')
        window.ReactNativeWebView.postMessage(JSON.stringify(YDRZAuthLogin))
        const a = !!YDRZAuthLogin.getTokenInfo
        window.ReactNativeWebView.postMessage(a.toString())
        window.ReactNativeWebView.postMessage('12311')
        const b = CryptoJS
        window.ReactNativeWebView.postMessage(b.toString())
        window.ReactNativeWebView.postMessage('789')
    </script>
`
}
