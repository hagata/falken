class APIAI {
  constructor() {
    this.sessionID_ = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  get(query) {
    const reqHeaders =
      new Headers({
        Authorization: 'Bearer 395b99f7e66c4105bde097522c997894'
      });

    const config = {
      url: 'https://api.api.ai/v1/query',
      params: {
        v: '20150910',
        query: query,
        lang: 'en',
        sessionID: this.sessionID_
      }
    };

    const qs = `${config.url}?v=${config.params.v}&query=["${config.params.query}"]&lang=${config.params.lang}&sessionID=${config.params.sessionID}`;
    console.log('qs', qs)

    let request = new Request(qs, {
      method: 'GET',
      headers: reqHeaders
    });
    return fetch(request);
  }
}

const API_AI = new APIAI();
export { API_AI };
