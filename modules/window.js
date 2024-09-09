
import events from 'dom/events.js';

export const loads   = events('load', window).broadcast();
export const resizes = events('resize', window).broadcast();
