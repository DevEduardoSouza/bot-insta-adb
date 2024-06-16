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
    await sleep(2000);

    // click on search result random
    await clickRandomElement("com.instagram.android:id/row_hashtag_container");
    await sleep(5000);

    // click on post result random
    await clickRandomElement("com.instagram.android:id/image_button");
    await sleep(2000);
    
    await dumpWindowLayout();
    // click on see liked
    await sleep(2000);
    await tapElementByResourceId(
        "com.instagram.android:id/row_feed_textview_likes"
    );
    
    await sleep(2000);
    await clickRandomElement("com.instagram.android:id/row_follow_button");
  } catch (error) {
    console.log(error);
  }
};
