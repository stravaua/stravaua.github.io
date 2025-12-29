// Copy-to-clipboard for code samples with fallback for insecure contexts (file://, http)
document.addEventListener('click', function (event) {
    const button = event.target.closest('.copy-button');
    if (!button) return;

    const targetId = button.getAttribute('data-target');
    const codeEl = targetId && document.getElementById(targetId);
    if (!codeEl) return;

    const text = codeEl.textContent.trim();
    const original = button.innerText;

    const fallbackCopy = () => {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(temp);
        return ok;
    };

    const handleSuccess = () => {
        button.innerText = 'Copied!';
        setTimeout(() => (button.innerText = original), 1500);
    };

    const handleError = () => {
        button.innerText = 'Error';
        setTimeout(() => (button.innerText = original), 1500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(handleSuccess).catch(() => {
            const ok = fallbackCopy();
            ok ? handleSuccess() : handleError();
        });
    } else {
        const ok = fallbackCopy();
        ok ? handleSuccess() : handleError();
    }
});
