import { config } from "./config/config";
import client from "./services/adbClient";
import startDevice from "./services/startDevice";
import { listDevices } from "./utils/devices";
import { sleep } from "./utils/sleep";

async function init() {
  try {
    // startDevice(config.pathDevice);
    // await sleep(20000);

    const devices = await listDevices(client);
    // console.log(devices);

    if (devices.length === 0) {
      console.log("No devices found, please try opening a new device");
      return;
    } else {
      config.deviceId = devices[0].id;
    }

    
  } catch (error) {
    console.error("Erro:", error);
  }
}

init();
