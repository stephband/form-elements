
import id from 'fn/id.js';
import { getScale } from './law.js';

// TODO: Remove in favour of law
export const scale   = { normalise(){ console.log('"scale" now "law"'); }, denormalise(){ console.log('"scale" now "law"'); } };
export const law     = getScale('linear');
export const min     = 0;
export const max     = 1;
export const ticks   = null;
export const step    = null;
export const value   = 0;
// New `unit` replaces `display`. `display` is now a compiled `fn(unit, value)`.
// Not complete.
export const unit    = '';
export const display = id;
