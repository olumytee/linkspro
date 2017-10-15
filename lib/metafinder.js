const og = require('open-graph');

const findMeta = url => {
  return new Promise((resolve, reject) => {
    og(url, (err, meta) => {
      if (err) {
        console.log(err);
        resolve(null);
      }
      resolve(meta);
    });
  });
};

module.exports = { findMeta };
