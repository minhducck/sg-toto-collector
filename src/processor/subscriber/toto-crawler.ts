import {Container} from "../../configuration/container";
import {PubSubManager} from "../../PubSubManager";
import {APPLICATION_CONFIGURATION} from "../../configuration/application.config";
import {QueueMessageType} from "../../types/queue-message.type";
import {DrawRecordType} from "../../types/draw-record.type";
import {TotoService} from "../../services/toto.service";
import {CsvWriter} from "../io/csv-writer";

const container = Container.getInstance();
const totoService = container.get<TotoService>(TotoService)
const csvWriter = new CsvWriter(APPLICATION_CONFIGURATION['RESULT_DATABASE']);

async function executeTotoResult(drawRecord: DrawRecordType) {
  try {
    return csvWriter.appendRecord(await totoService.getResultFromDrawRecord(drawRecord));
  } catch (e) {
    console.error(e);
  }
}

export async function main() {
  const channelName = APPLICATION_CONFIGURATION['TOTO_CHANNEL_NAME'].toUpperCase();

  console.info(`[${channelName}][Subscriber][${new Date().toISOString()}]: Creating subscriber for "${channelName}" channel.`);
  const subscriber = await container.get<PubSubManager>(PubSubManager).registerSubscriber(channelName);

  console.info(`[${channelName}][Subscriber][${new Date().toISOString()}]: Start subscribing handler on "${channelName}" channel...`);
  // @ts-ignore
  subscriber.subscribe(channelName, function (message, channel) {
    const queueMessage = JSON.parse(message) as QueueMessageType;
    console.log(`[${channelName}][Subscriber][${new Date().toISOString()}]: Received message from ${channelName}:`, queueMessage)
    executeTotoResult(queueMessage.data as DrawRecordType)

  }).then(() => {
    console.info(`[${channelName}][Subscriber][${new Date().toISOString()}]: Subscribed handler to "${channelName}" channel.`);
  });

  return subscriber;
}
