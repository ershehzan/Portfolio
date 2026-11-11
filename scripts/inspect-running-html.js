const http = require('http');

http.get('http://localhost:3000', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('id="about"');
    if (idx !== -1) {
      console.log(data.slice(idx, idx + 4000));
    }
  });
});
