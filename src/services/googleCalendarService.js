/*import { gapi } from 'gapi-script';

const CLIENT_ID = '449101608313-f0cu00ejp2jk7qes6nia2dd8h1khd8n0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBR4x1tpnZfOqIVeLaKJDf0Ej8D-wVczaI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export function initClient() {
    return new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
                redirectUri: 'http://localhost:5174' // Add this line
            }).then(() => {
                gapi.auth2.getAuthInstance().signIn().then(() => {
                    resolve();
                }).catch(reject);
            }).catch(reject);
        });
    });
}

export function fetchEvents() {
    return gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
    }).then(response => response.result.items);
}*/
