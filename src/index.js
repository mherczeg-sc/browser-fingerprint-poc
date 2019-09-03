import Fingerprint2 from "../node_modules/fingerprintjs2";
import GetBrowserFingerprinting from "../node_modules/get-browser-fingerprint";
import SHA2 from "../node_modules/sha2";

const output = document.createElement('dl')
output.setAttribute('id', 'output');
const done = document.createElement('div')
done.setAttribute('id', 'done');

document.body.appendChild(output);
document.body.appendChild(done);
new Promise((resolve) => {
    setTimeout(() => {
        Fingerprint2.get((components) => {
            appendData('fpjs2', SHA2.SHA256(components).toString("hex"))
            console.log('fpjs2', components)
            resolve();
        })
    }, 500)
}).then(() => new Promise((resolve) => {
    appendData('gbfp', GetBrowserFingerprinting())
    resolve();
})).then(() => {
    document.getElementById('done').textContent = "Done";
});


function appendData( label, value) {
    const dt = document.createElement('dt')
    dt.textContent = label;

    const dd = document.createElement('dd')
    dd.textContent = value;
    document.getElementById('output').appendChild(dt)
    document.getElementById('output').appendChild(dd)
}

