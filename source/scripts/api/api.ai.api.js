class APIAI {
  constructor() {
    this.sessionId_ = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

  get(query, contexts = []) {
    const reqHeaders =
      new Headers({
        Authorization: 'Bearer 395b99f7e66c4105bde097522c997894'
      });

    const config = {
      url: 'https://api.api.ai/v1/query',
      params: {
        v: '20161022',
        query: query,
        lang: 'en',
        sessionId: this.sessionId_,
        contexts: contexts
      }
    };

    const qs = `${config.url}?v=${config.params.v}
    &query=["${config.params.query}"]&lang=${config.params.lang}
    &sessionId=${config.params.sessionId}`;

    let request = new Request(qs, {
      method: 'GET',
      headers: reqHeaders
    });
    return fetch(request);
  }
}

const API_AI = new APIAI();
export {API_AI};
