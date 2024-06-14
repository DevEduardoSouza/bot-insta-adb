import { exec } from "child_process";
import { config } from "../config/config";

const deviceId = config.deviceId;
const localPath = config.xmlDumpPath;

const dumpWindowLayout = async () => {
  const dumpCommand = `adb ${deviceId} shell uiautomator dump /sdcard/window_dump.xml`;

  try {
    exec(dumpCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Erro do comando: ${stderr}`);
        return;
      }
      console.log("Layout da janela capturado.");

      // Comando para baixar o arquivo XML gerado para o sistema local
      const pullCommand = `adb ${deviceId} pull /sdcard/window_dump.xml ${localPath}`;

      // Executar o comando para baixar o arquivo XML
      exec(pullCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao baixar o arquivo XML: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Erro do comando: ${stderr}`);
          return;
        }
        console.log(`Arquivo XML salvo em: ${localPath}`);
      });
    });
  } catch (error) {
    console.error("Erro ao capturar o layout da janela:", error);
  }
};

export default dumpWindowLayout;
