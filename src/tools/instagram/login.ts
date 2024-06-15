import captureScreenshot from "../../commands/captureScreenshot";
import dumpWindowLayout from "../../commands/dumpWindowLayout";
import isElementPresentByText from "../../commands/isElementPresentByText";
import tapElementByContentDesc from "../../commands/tapElementByContentDesc";
import typeText from "../../commands/typeText";
import { config } from "../../config/config";
import { IUser } from "../../types/IUser";
import { sleep } from "../../utils/sleep";

const login = async (user: IUser) => {
  try {
    const { username, password } = user;

    await dumpWindowLayout();
    await sleep(2000);

    // verificar se está na página de login
    const isPageLogin = isElementPresentByText(config.textPage.login);

    if (!isPageLogin) {
      console.log("login has already been done");
      return;
    }

    await sleep(1500);
    await tapElementByContentDesc(config.textPage.login);
    await typeText(username);

    await sleep(1500);
    await tapElementByContentDesc("Senha");
    await typeText(password);

    await sleep(1500);
    await tapElementByContentDesc("Entrar");

    // page save save Insta
    await sleep(1500);
    await tapElementByContentDesc("Agora não");

    await sleep(1500);
    await tapElementByContentDesc("Pular");
    await sleep(1500);
  } catch (error) {
    console.log("Error Login", error);
    await captureScreenshot();
  }
};

export default login;
