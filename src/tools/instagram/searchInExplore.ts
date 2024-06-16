import clickAtPosition from "../../commands/clickAtPosition";
import clickRandomElement from "../../commands/clickRandomElement";
import dumpWindowLayout from "../../commands/dumpWindowLayout";
import tapElementByResourceId from "../../commands/tapElementByResourceId";
import typeText from "../../commands/typeText";
import { sleep } from "../../utils/sleep";

export const searchInExplore = async (search: string) => {
  try {
    // comeback to home
    await tapElementByResourceId("com.instagram.android:id/feed_tab");
    await sleep(1500);

    // click on search icon
    await tapElementByResourceId("com.instagram.android:id/search_tab");
    await sleep(1500);

    // click on search tab
    await tapElementByResourceId(
      "com.instagram.android:id/action_bar_search_edit_text"
    );
    await sleep(1500);

    // type on search tab
    await typeText(search);
    await sleep(4000);

    // click on search result random
    // const resourceIdOfList = "com.instagram.android:id/recycler_view";
    await clickRandomElement("com.instagram.android:id/row_hashtag_container");
  } catch (error) {
    console.log(error);
  }
};
