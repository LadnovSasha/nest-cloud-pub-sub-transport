import { PubSub } from '@google-cloud/pubsub';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { CloudPubSubConfig } from '../typings/cloud-pub-sub-config';
/**
 * Implementation of Google Cloud Pub/Sub as a `CustomTransportStrategy` for Nestjs
 * **MicroServices** system.
 *
 * @see https://cloud.google.com/pubsub/docs/overview
 * @see https://cloud.google.com/nodejs/docs/reference/pubsub/0.28.x/
 *
 * TODO: in order to open-source it for NestJs, we must use `this.loadPackage`
 * to load `@google-cloud/pubsub` dynamically instead of having it installed
 * in the dependenices of the project. Also, all types used from the package
 * should be duplicated into local types/interfaces.
 */
export declare class CloudServerPubSub extends Server implements CustomTransportStrategy {
    private readonly pubSubClient;
    private readonly options;
    private readonly subscriptions;
    /** Overriden from base class `Server`: we want it re-assignable */
    private customLogger;
    constructor(config?: CloudPubSubConfig);
    /**
     * Initializes the default topic and subscription if they were
     * given to the constructor. Then notify the system that the
     * server is ready.
     *
     * @param callback Executed when the operation is complete.
     */
    listen(callback: () => void): Promise<void>;
    /**
     * Closes all the current subscriptions: destroy the associated message stream,
     * and unregister any handler of `message` event.
     *
     * @return Resolves when all subscriptions have been closed, or rejects.
     */
    close(): Promise<void[]>;
    /**
     * Creates a topic in Pub/Sub.
     *
     * @param name Name of the target topic.
     * @param gaxOpts Optional options (see Google API extensions).
     *
     * @return Resolves on success, or rejects.
     */
    createTopic(name: string, gaxOpts?: Parameters<PubSub['createTopic']>[1]): Promise<void>;
    /**
     * Creates a subscription to `topic` in Pub/Sub. If a subscription already
     * exists for the given `name`, a simple reference is created.
     *
     * As soon as the subscription is available, a listener is added
     * to event `message` so this strategy can handle it.
     *
     * @param topic Name of the topic to subscribe to.
     * @param name Name of the subscription.
     * @param options `CreateSubscriptionOptions` passed as-is to the Node.js client.
     *
     * @return Resolves on success, or rejects.
     */
    createSubscription(topic: string, name: string, options?: Parameters<PubSub['createSubscription']>[2]): Promise<void>;
    /**
     * Create (or instantiate) a topic `topic`.
     *
     * @param topic Name of the topic to be created (or just instantiated, if existing).
     *
     * @return Resolves with an instance of `Topic`, or undefined. Any error will be logged but not rejected.
     */
    private useDefaultTopic;
    /**
     * Create (or instantiate) a subscription `subscription`.
     *
     * @param topic Name of the subscription to be created (or just instantiated, if existing).
     *
     * @return Resolves with an instance of `Subscription`, or undefined. Any error will be logged but not rejected.
     */
    private useDefaultSubscription;
    /**
     * Responsible for handling any incoming message: parsing (and
     * structural checking). `message` is expected to be a stringified
     * POJO containing a string prop. `pattern` and an optional object
     * prop. `data`.
     *
     * @see {CloudPubSubMessageData}
     *
     * @param message Message received from a Subscription.
     * @param subscriptionName Name of the subscription receiving the message.
     *
     * @return Resolve with the Observable sent by the handler of the message pattern.
     */
    private handleMessage;
    /**
     * Parse the stringified data of a message sent by a publisher and
     * ensure this last has a valid structure (it must be an object with
     * a string property `pattern`).
     *
     * @param value So-called "stringified" `data`.
     *
     * @return representation of the given `value`, or `undefined`.
     *
     * @see {CloudPubSubMessage}
     */
    private parsePublisherData;
}
