import { config } from "../config/config";
import fs from "fs";
import parseXML from "xml2js";
import { ICoordinates } from "../types/types";
import clickAtPosition from "./clickAtPosition";
import dumpWindowLayout from "./dumpWindowLayout";

const findElementByResourceId = (node: any, resourceId: string): any | null => {
  if (node.$ && node.$["resource-id"] === resourceId) {
    return node;
  }
  if (node.node) {
    for (let child of node.node) {
      const result = findElementByResourceId(child, resourceId);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

const parseBounds = (bounds: string) => {
  const matches = bounds.match(/\d+/g);
  if (!matches) {
    throw new Error(`Invalid bounds string: ${bounds}`);
  }
  const [left, top, right, bottom] = matches.map(Number);
  const x = Math.floor((left + right) / 2);
  const y = Math.floor((top + bottom) / 2);
  return { x, y };
};

const getCoordinatesByResourceId = (
  xmlDumpPath: string,
  resourceId: string
): ICoordinates | null => {
  const xmlContent = fs.readFileSync(xmlDumpPath, "utf-8");
  let coordinates: ICoordinates | null = null;

  parseXML.parseString(xmlContent, (err, result) => {
    if (err) {
      console.error("Error parsing XML file:", err);
      return;
    }

    const rootNode = result.hierarchy.node[0];
    const element = findElementByResourceId(rootNode, resourceId);

    if (element) {
      if (element.$ && element.$.bounds) {
        const bounds = element.$.bounds;
        console.log(bounds);
        coordinates = parseBounds(bounds);
      } else {
        console.error(
          `The element with the resource ID "${resourceId}" does not have the "bounds" property`
        );
      }
    } else {
      console.error(
        `Element with resource ID "${resourceId}" was not found in the XML file`
      );
    }
  });

  return coordinates;
};

const tapElementByResourceId = async (resourceId: string): Promise<void> => {
  const xmlDumpPath = config.xmlDumpPath;
  const coordinates = getCoordinatesByResourceId(xmlDumpPath, resourceId);

  if (!coordinates) {
    console.error(`Element with resource ID ${resourceId} not found.`);
    return;
  }
  const { x, y } = coordinates;
  await clickAtPosition({ x, y });
};

export default tapElementByResourceId;
