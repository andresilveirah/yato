// A quick and dirty replacement for node-uuid package
// source https://gist.github.com/jed/982883

import crypto from 'crypto';

export const uuid = a => a?(a^crypto.randomBytes(1)[0] % 16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);
