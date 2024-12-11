
import { getScale } from './scales.js';

// TODO: Remove in favour of law
export const scale   = { normalise(){ console.log('"scale" now "law"'); }, denormalise(){ console.log('"scale" now "law"'); } };

export const law     = getScale('linear');
export const min     = 0;
export const max     = 1;
export const ticks   = null;
export const step    = null;
export const display = '';
export const value   = 0;
