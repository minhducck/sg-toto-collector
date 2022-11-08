import {Container} from "../../configuration/container";
import {PubSubManager} from "../../PubSubManager";
import {APPLICATION_CONFIGURATION} from "../../configuration/application.config";
import {QueueMessageType} from "../../types/queue-message.type";
import {delay} from "../../helper/delay.helper";
import {TotoService} from "../../services/toto.service";
import {DrawRecordType} from "../../types/draw-record.type";
import {CsvReader} from "../io/csv-reader";

const container = Container.getInstance();

export async function main() {
  const totoService: TotoService = container.get<TotoService>(TotoService);
  const channelName = APPLICATION_CONFIGURATION['TOTO_CHANNEL_NAME'].toUpperCase();
  console.info(`[${channelName}][Publisher][${new Date().toISOString()}]: Creating publisher for "${channelName}" channel.`);
  const publisher = await container.get<PubSubManager>(PubSubManager).registerPublisher(channelName).then((publisher) => {
    console.info(`[${channelName}][Publisher][${new Date().toISOString()}]: Initialized publisher for "${channelName}" channel.`);
    return publisher;
  });

  const drawList: DrawRecordType[] = await totoService.getListOfAvailableResults();
  const currentSavedList = await new CsvReader(APPLICATION_CONFIGURATION['RESULT_DATABASE']).getData();

  for (const drawRecord of drawList) {
    if (!currentSavedList[drawRecord.drawId]) {
      const task = {data: drawRecord, topicId: "crawl_toto_result_page"} as QueueMessageType
      console.info(`[${channelName}][Publisher][${new Date().toISOString()}]: Published message to "${channelName}:"`, task);
      // @ts-ignore
      await publisher.publish(channelName, JSON.stringify(task)).then(async () => await delay(+APPLICATION_CONFIGURATION['SLEEP_EACH_REQUEST']));
    }
  }
}
