class PubSub {
  constructor(params) {
    this.subscriptions_ = {};
  }

    /**
     * Publishes a Topic. If the topic exists in the PubSub subscriptions, the
     * corresponding function will be invoked
     *
     * @param {String} topic Topic to publish.
     * @param {any} args Rest of arguments passed on publish will be applied to
     *  the function when invoked.
     */
  publish(topic, ...args) {
    if (this.subscriptions_[topic]) {
      for (const fn of this.subscriptions_[topic])
        fn(...args);
    }
  }

    /**
     * Subscribes a Function to a topic. The function will be invoked when the
     *  corresponding topic is published.
     *
     * @param {String} topic Identifier for storing subscriptions.
     * @param {Function} fn fn Function to be invoked when the matching topic
     *  is published to.
     */
  subscribe(topic, fn) {
    this.subscriptions_[topic] = this.subscriptions_[topic] || [];
    this.subscriptions_[topic].push(fn);
  }

    /**
     * Unsubscribe a function from a topic. Only Deletes functions stored
     *  through a variable/ or function name.
     *
     * @param {String} topic Topic to unsubscribe.
     * @param {Function} fn The function to unsubscribe.
     */
  unsubscribe(topic, fn) {
    if (this.subscriptions_[topic]) {
      this.subscriptions_[topic].forEach((value, index) => {
        if (value === fn) {
          this.subscriptions_[topic].splice(index, 1);
        }
      });
    }
  }

}

const pubsub = new PubSub();

/**
 * Exports a PubSub "singleton" instance. Subscriptions are shared app wide
 * when importing pubsub.
 */
export default pubsub;

