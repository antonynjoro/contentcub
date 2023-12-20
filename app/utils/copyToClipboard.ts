/**
 * Copies the provided HTML content to the clipboard as plain text.
 * @param html The HTML content to be copied.
 * @returns A promise that resolves when the content is successfully copied to the clipboard, or rejects with an error if copying fails.
 */
export default function copyToClipboard(html: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // Extract plain text from HTML
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        const plainText = tempElement.textContent || tempElement.innerText || '';

        // Create a blob for plain text
        const textBlob = new Blob([plainText], { type: 'text/plain' });
        const data = new ClipboardItem({ 'text/plain': textBlob });

        navigator.clipboard.write([data]).then(() => {
            console.log('Copied to clipboard');
            resolve();
        }).catch(e => {
            console.error('Error in copying:', e);
            reject(e);
        });
    });
}
