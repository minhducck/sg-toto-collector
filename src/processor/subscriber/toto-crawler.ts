import {Container} from "../../configuration/container";
import {PubSubManager} from "../../PubSubManager";
import {APPLICATION_CONFIGURATION} from "../../configuration/application.config";
import {QueueMessageType} from "../../types/queue-message.type";

const container = Container.getInstance();

export async function main() {
  const channelName = APPLICATION_CONFIGURATION['TOTO_CHANNEL_NAME'].toUpperCase();

  console.info(`[${channelName}][Subscriber][${new Date().toISOString()}]: Creating subscriber for "${channelName}" channel.`);
  const subscriber = await container.get<PubSubManager>(PubSubManager).registerSubscriber(channelName);

  console.info(`[${channelName}][Subscriber][${new Date().toISOString()}]: Start subscribing handler on "${channelName}" channel...`);
  // @ts-ignore
  subscriber.subscribe(channelName, function (message, channel) {
    const queueMessage = JSON.parse(message) as QueueMessageType;
    console.log(`[${channelName}][Subscriber][${new Date().toISOString()}]: Received message from ${channelName}:`, queueMessage)
  }).then(() => {
    console.info(`[${channelName}][Subscriber][${new Date().toISOString()}]: Subscribed handler to "${channelName}" channel.`);
  });

  return subscriber;
}
