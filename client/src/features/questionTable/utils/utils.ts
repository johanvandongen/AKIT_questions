import { type ITable } from '../../../models/ITable';

const tableInHtmlString = (table: ITable): string => {
    const html = `<table border="1">
    <tr><td>table id</td><td>${table._id}</td></tr>
    <tr><td>Datum</td><td>${table.date}</td></tr>
    <tr><td>Issue nummer (als van toepassing)</td><td>${table.issue}</td></tr>
    <tr><td>Algebrakit ID</td><td>${table.exerciseIds.join('\n')}</td></tr>
    <tr><td>Screenshot</td><td>${table.screenshot
        .map((image) => '<img src=' + image + '/>')
        .join(' ')}</td></tr>
    <tr><td>Vraag</td><td>${table.question}</td></tr>
    <tr><td>Hoofdstuk + Vraag + Prio (zie planning)</td><td>${table.chapter}</td></tr>
    <tr><td>Behandeld</td><td>${table.treated.state}</td></tr>
    <tr><td>Antwoord Kay / Lieke</td><td>${table.answer
        .map((answer) => '<b>' + answer.author + '</b>: ' + answer.answer)
        .join(',')}</td></tr>
    <tr><td>Reply Auteur (indien van toepassing)</td><td>${table.authorReply
        .map((answer) => '<b>' + answer.author + '</b>: ' + answer.answer)
        .join(',')}</td></tr>
    </table>`;
    return html;
};

export const copyTable = (table: ITable): void => {
    const html: string = tableInHtmlString(table);
    const blob = new Blob([html], { type: 'text/html' });

    navigator.clipboard
        .write([new ClipboardItem({ [blob.type]: blob })])
        .then((response) => {
            console.log('Succesfully copied to clipboard', response);
        })
        .catch((error) => {
            console.log('Something went wrong when copying to the clipboard', error);
        });
};
