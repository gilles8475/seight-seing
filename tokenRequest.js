const fs = require('fs')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  readline.question('entre your mapbox acces token: ', token => {
      const content='export const mapboxToken="'+token+'"'
      try {
        const data = fs.writeFileSync('./secret.js', content)
        //file written successfully
      } catch (err) {
        console.error(err)
      }
    console.log(`creating secret.js with ${token} token!`);

    readline.close();
  });