/* Canvas */

import by      from '../../../fn/modules/by.js';
import get     from '../../../fn/modules/get.js';

// TODO: remove dependency on Soundstage
import Envelope from '../../../soundstage/nodes/envelope.js';

// Oversampling produces graphs with fewer audio aliasing artifacts
// when curve points fall between pixels.
const samplesPerPixel = 4;
const nodashes = [];
const dashes   = [2, 6];

/**
drawCurvePositive(ctx, box, rate, data, color)

Draws a filled automation curve.

ctx:   canvas context
box:   array of 4 numbers describing view box
rate:  data points per px
data:  array of data points
color: base color
**/

export function drawCurvePositive(ctx, box, rate, data, color) {
    let n = 0;

    ctx.beginPath();
    ctx.moveTo(
        box.x + n / rate,
        box.y + (1 - data[0]) * box.height
    );

    while (++n < data.length) {
        ctx.lineTo(
            box.x + n / rate,
            box.y + (1 - data[n]) * box.height
        );
    }

    // Stroke the waveform
    ctx.strokeStyle = color;
    ctx.lineWidth   = '2';
    ctx.lineCap     = 'round';
    ctx.setLineDash(nodashes);
    ctx.stroke();

    // Now complete its area and then fill it
    ctx.lineTo(
        box.x + box.width,
        box.y + box.height
    );

    ctx.lineTo(
        box.x,
        box.y + box.height
    );

    ctx.fillStyle = color + '2b';
    ctx.fill();
    ctx.closePath();
}

export function drawTargetLines(ctx, box, data, color) {
    let n = -1;
    const radius = 18;

    ctx.beginPath();

    while (++n < data.length) {
        if (data[n].type !== 'target') {
            continue;
        }

        // Vertical line
        ctx.moveTo(
            box.x + data[n].x * box.width,
            box.y + (1 - (data[n - 1] ? data[n - 1].y : 0)) * box.height
        );

        ctx.lineTo(
            box.x + data[n].x * box.width,
            box.y + (1 - data[n].y) * box.height + ((data[n - 1] ? data[n - 1].y : 0) > data[n].y ? -radius : radius)
        );

        // Horizontal line
        ctx.moveTo(
            box.x + data[n].x * box.width + radius,
            box.y + (1 - data[n].y) * box.height
        );

        ctx.lineTo(
            // Draw to next event
            box.x + (data[n + 1] ? data[n + 1].x : 1) * box.width,
            box.y + (1 - data[n].y) * box.height
        );
    }

    ctx.lineWidth   = '2';
    ctx.lineCap     = 'round';
    ctx.strokeStyle = color;
    ctx.setLineDash(dashes);
    ctx.stroke();
    ctx.closePath();
}

export function drawAudioEnvelope(ctx, viewbox, valuebox, xscale, xmin, xmax, yscale, ymin, ymax, events, color, before) {
    // Draw lines / second
    const drawRate = samplesPerPixel * viewbox.width / valuebox.width;
    const offline  = new OfflineAudioContext(1, samplesPerPixel * viewbox.width, 22050);
    const envelope = new Envelope(offline, { 'attack': events.map((event) => (
            // Condense time by drawRate so that we generate samplePerPixel
            // samples per pixel.
            event.type === 'target' ?
                [event.x * drawRate / 22050, event.type, event.y, event.duration * drawRate / 22050] :
            event.type ?
                [event.x * drawRate / 22050, event.type, event.y] :
                // Default to type 'step' where type is not defined
                [event.x * drawRate / 22050, 'step',     event.y]
        ))
    });

    envelope.connect(offline.destination);
    envelope.start(valuebox.x, 'attack');
    envelope.stop(valuebox.width);

    ctx.activeRenders = ctx.activeRenders ?
        ctx.activeRenders + 1 :
        1 ;

    ctx.cacheddata && drawCurvePositive(ctx, viewbox, samplesPerPixel, ctx.cacheddata, color);
    ctx.cacheddata && drawTargetLines(ctx, viewbox, events.map((event) => ({
        x:        xscale.normalise(xmin, xmax, event.x),
        y:        yscale.normalise(ymin, ymax, event.y),
        type:     event.type,
        duration: event.duration
    })).sort(by(get('x'))), color);

    return offline
    .startRendering()
    .then((buffer) => {
        // Only actually render the latest
        if (--ctx.activeRenders) { return; }

        // Render the background again
        before();

        const data = buffer.getChannelData(0).map((y) => yscale.normalise(ymin, ymax, y));
        drawCurvePositive(ctx, viewbox, samplesPerPixel, data, color);
        drawTargetLines(ctx, viewbox, events.map((event) => ({
            x:        xscale.normalise(xmin, xmax, event.x),
            y:        yscale.normalise(ymin, ymax, event.y),
            type:     event.type,
            duration: event.duration
        })).sort(by(get('x'))), color);
        ctx.cacheddata = data;
    });
}
