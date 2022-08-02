$(function () {
    const opening = $("textarea#id_opening");
    const counter = $("<span id='opening-line-count'></span>")
    opening.after(counter);
    opening.on('input', function (event) {
        const lines = event.target.value.split('\n').filter(l => l.trim().length > 0);
        counter.text(`${lines.length}/6 lines`);
    });
    opening.trigger('input');
});