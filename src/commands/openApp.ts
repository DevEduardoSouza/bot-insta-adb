import { config } from "../config/config";
import client from "../services/adbClient";

export interface IApplication {
  packageName: string;
  activityName: string;
}

const openApp = async (application: IApplication) => {
  const command = `am start -n ${application.packageName}/${application.activityName}`;
  try {
    await client.shell(config.deviceId, command);
    console.log("App opened");
  } catch (e) {
    console.error("Error when opening the app", e);
  }
};

export default openApp;
