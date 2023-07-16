// Check version
const version = '1.0.59';
const installed = localStorage.getItem('version');

// DEV: OFF
// if (installed !== version) {
//     console.log(
//         `On version ${installed}. Latest version is ${version}. Settings cleared.`
//     );
//     localStorage.clear();
//     localStorage.setItem('version', version);
//     localStorage.setItem('showVersionDialog', 'true');
//     document.body.classList.add('modal-open');
// } else {
//     console.log(`On latest version ${version}.`);
// }

// Set theme
setMode();

// Set data attributes
['light-theme', 'dark-theme', 'font-family', 'font-size'].forEach((att) =>
    setDataAttribute(att)
);

// Create Meta theme
const metaTheme = localStorage.getItem('meta-theme');
const meta = document.createElement('meta');
meta.name = 'theme-color';
meta.content = metaTheme;
document.getElementsByTagName('head')[0].appendChild(meta || '#221d29');

// Don't animate transitions on load
setTimeout(() => {
    document.body.classList.add('can-transition');
}, 250);

function setMode() {
    const localMode = localStorage.getItem('prefers-color-scheme');

    if (!localMode) {
        document.documentElement.setAttribute(
            'data-prefers-color-scheme',
            'Dark'
        );

        return;
    }

    if (localMode === 'Light' || localMode === 'Dark') {
        setModeValue(localMode);
        return;
    }
}

function setModeValue(mode) {
    localStorage.setItem('prefers-color-scheme', mode);
    document.documentElement.setAttribute('data-prefers-color-scheme', mode);
}

function setDataAttribute(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return;
    }

    // Set data attribute
    document.documentElement.setAttribute(`data-${key}`, value);
}

function setLocalSetting(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return;
    }

    // Set CSS varaible
    document.documentElement.style.setProperty(`--${key}`, value);
}
