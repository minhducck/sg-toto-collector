import {Container} from "../../configuration/container";
import {PubSubManager} from "../../PubSubManager";
import {APPLICATION_CONFIGURATION} from "../../configuration/application.config";
import {QueueMessageType} from "../../types/queue-message.type";
import {delay} from "../../helper/delay.helper";

const resultUrl = "https://www.singaporepools.com.sg/en/product/sr/Pages/toto_results.aspx"
const container = Container.getInstance();
const constructResultUrl = (drawNumber: number): string => {
  const url = new URL(resultUrl);

  url.searchParams.append(
    "sppl",
    Buffer.from(`DrawNumber=${drawNumber}`)
      .toString('base64')
      .replace(new RegExp('=+$'), '')
  );
  return url.toString();
}


export async function main() {
  const channelName = APPLICATION_CONFIGURATION['TOTO_CHANNEL_NAME'].toUpperCase();
  console.info(`[${channelName}][Publisher][${new Date().toISOString()}]: Creating publisher for "${channelName}" channel.`);
  const publisher = await container.get<PubSubManager>(PubSubManager).registerPublisher(channelName).then((publisher) => {
    console.info(`[${channelName}][Publisher][${new Date().toISOString()}]: Initialized publisher for "${channelName}" channel.`);
    return publisher;
  });

  // Start Publishing Tasks
  for (let i = 3814; i >= 1 ; i--) {
    const task = {data: constructResultUrl(i), topicId: "crawl_toto_result_page"} as QueueMessageType

    console.info(`[${channelName}][Publisher][${new Date().toISOString()}]: Published message to "${channelName}:"`, task);
    // @ts-ignore
    await publisher.publish(channelName, JSON.stringify(task)).then(async () => await delay(+APPLICATION_CONFIGURATION['SLEEP_EACH_REQUEST']));
  }
}
