import {
  Observable, catchError, switchMap, of, interval, map,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
// import { switchMap } from 'rxjs/operators';

export default class Message {
  constructor() {
    this.messages = document.querySelector('.messages');
    this.getDataMessages();
  }

  getDataMessages() {
    this.objMess = {
      status: 'ok',
      timestamp: 1553400000,
      messages: [],
    };

    const strim$ = interval(2000).pipe(switchMap(() => ajax.getJSON('http://localhost:8888/')))
      .pipe(
        catchError(() => of(this.objMess)),

      );
    strim$.subscribe({
      next: (value) => this.createMessage(value),
      // eslint-disable-next-line no-console
      error: (error) => console.log('error', error),
    });
  }

  createMessage(value) {
    for (let i = 0; i < value.messages.length; i += 1) {
      this.createTextMessage(value.messages[i]);
      const messageEl = document.createElement('div');
      messageEl.classList.add('message');
      messageEl.innerHTML += this.htmlMess;
      this.messages.prepend(messageEl);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getTextMessage(text) {
    if (text.length > 15) {
      const textMod = `${text.match(/.{15}/i)}...`;
      return textMod;
    } return text;
  }

  // eslint-disable-next-line class-methods-use-this
  getDate(timestamp) {
    const date = `${new Date(timestamp).toLocaleTimeString().slice(0, -3)} ${new Date(timestamp).toLocaleDateString()}`;
    return date;
  }

  createTextMessage(message) {
    this.htmlMess = `
        <div class="userName">${message.from}</div>
        <div class="messageText">${this.getTextMessage(message.subject)}</div>
        <div class="messageDate">${this.getDate(message.received)}</div>
    `;
  }
}
