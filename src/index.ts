const EMOJI_MAPPINGS: { [key: string]: string } = {
  smile: "https://em-content.zobj.net/content/2020/07/27/smile.png",
  happy: "https://em-content.zobj.net/content/2020/07/27/happy.png",
  angry: "https://em-content.zobj.net/content/2020/07/27/angry.png",
  cry: "https://em-content.zobj.net/content/2020/07/27/cry.png",
  embarrassed: "https://em-content.zobj.net/content/2020/07/27/embarrassed.png",
  surprised: "https://em-content.zobj.net/content/2020/07/27/surprised.png",
  wronged: "https://em-content.zobj.net/content/2020/07/27/wronged.png",
  shout: "https://em-content.zobj.net/content/2020/07/27/shout.png",
  flushed: "https://em-content.zobj.net/content/2020/07/27/flushed.png",
  yummy: "https://em-content.zobj.net/content/2020/07/27/yummy.png",
  complacent: "https://em-content.zobj.net/content/2020/07/27/complacent.png",
  drool: "https://em-content.zobj.net/content/2020/07/27/drool.png",
  scream: "https://em-content.zobj.net/content/2020/07/27/scream.png",
  weep: "https://em-content.zobj.net/content/2020/07/27/weep.png",
  speechless: "https://em-content.zobj.net/content/2020/07/27/speechless.png",
  funnyface: "https://em-content.zobj.net/content/2020/07/27/funnyface.png",
  laughwithtears:
    "https://em-content.zobj.net/content/2020/07/27/laughwithtears.png",
  facewithrollingeyes:
    "https://em-content.zobj.net/content/2020/07/27/facewithrollingeyes.png",
  sulk: "https://em-content.zobj.net/content/2020/07/27/sulk.png",
  thinking: "https://em-content.zobj.net/content/2020/07/27/thinking.png",
  lovely: "https://em-content.zobj.net/content/2020/07/27/lovely.png",
  greedy: "https://em-content.zobj.net/content/2020/07/27/greedy.png",
  wow: "https://em-content.zobj.net/content/2020/07/27/wow.png",
  joyful: "https://em-content.zobj.net/content/2020/07/27/joyful.png",
  hehe: "https://em-content.zobj.net/content/2020/07/27/hehe.png",
  slap: "https://em-content.zobj.net/content/2020/07/27/slap.png",
  tears: "https://em-content.zobj.net/content/2020/07/27/tears.png",
  stun: "https://em-content.zobj.net/content/2020/07/27/stun.png",
  cute: "https://em-content.zobj.net/content/2020/07/27/cute.png",
  blink: "https://em-content.zobj.net/content/2020/07/27/blink.png",
  disdain: "https://em-content.zobj.net/content/2020/07/27/disdain.png",
  astonish: "https://em-content.zobj.net/content/2020/07/27/astonish.png",
  rage: "https://em-content.zobj.net/content/2020/07/27/rage.png",
  cool: "https://em-content.zobj.net/content/2020/07/27/cool.png",
  excited: "https://em-content.zobj.net/content/2020/07/27/excited.png",
  smileface: "https://em-content.zobj.net/content/2020/07/27/smileface.png",
  evil: "https://em-content.zobj.net/content/2020/07/27/evil.png",
  angel: "https://em-content.zobj.net/content/2020/07/27/angel.png",
  laugh: "https://em-content.zobj.net/content/2020/07/27/laugh.png",
  pride: "https://em-content.zobj.net/content/2020/07/27/pride.png",
  nap: "https://em-content.zobj.net/content/2020/07/27/nap.png",
  loveface: "https://em-content.zobj.net/content/2020/07/27/loveface.png",
  awkward: "https://em-content.zobj.net/content/2020/07/27/awkward.png",
  shock: "https://em-content.zobj.net/content/2020/07/27/shock.png",
};

const EMOJI_PATTERN = new RegExp(
  "\\[(" + Object.keys(EMOJI_MAPPINGS).join("|") + ")\\]",
  "g"
);

const processNode = (node: Node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || "";
    if (text.match(EMOJI_PATTERN)) {
      const container = document.createElement("span");

      let lastIndex = 0;
      let match;

      while ((match = EMOJI_PATTERN.exec(text)) !== null) {
        const beforeText = text.slice(lastIndex, match.index);
        if (beforeText) {
          container.appendChild(document.createTextNode(beforeText));
        }

        const emojiName = match[1];
        const img = document.createElement("img");
        img.src = EMOJI_MAPPINGS[emojiName];
        img.alt = `[${emojiName}]`;
        img.style.height = "1.4em";
        img.style.verticalAlign = "middle";
        img.style.display = "inline-block";
        img.title = emojiName;
        container.appendChild(img);

        lastIndex = EMOJI_PATTERN.lastIndex;
      }

      if (lastIndex < text.length) {
        container.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      node.parentNode?.replaceChild(container, node);
    }
  } else {
    for (const childNode of Array.from(node.childNodes)) {
      processNode(childNode);
    }
  }
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      processNode(node);
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
