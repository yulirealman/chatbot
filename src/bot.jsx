import dayjs from "dayjs";
export function createAgent() {
  const memory = {
    lastIntent: null,
    lastEntity: null,
    lastAnswer: null
  };

  const random = arr => arr[Math.floor(Math.random() * arr.length)];

  function detectIntent(msg, doc) {
    if (msg.includes("time")) return "time";
    if (msg.includes("date") || msg.includes("day")) return "date";
    if (doc && doc.has("#Greeting")) return "greeting";
    if (msg.includes("your name")) return "name";
    if (msg.startsWith("why")) return "why";
    if (msg.startsWith("how")) return "how";
    if (msg.endsWith("?")) return "question";
    return "statement";
  }

  function reply(text) {
    const msg = text.toLowerCase().trim();
    const doc = typeof compromise !== "undefined" ? compromise(msg) : null;
    const intent = detectIntent(msg, doc);

    // ---- FOLLOW-UP LOGIC ----
    if (intent === "why" && memory.lastAnswer) {
      return random([
        "Because that’s usually how it plays out in practice.",
        "Short answer: trade-offs. Long answer: humans.",
        "There’s context behind it — it’s not random."
      ]);
    }

    if ((msg.includes("again") || msg.includes("now")) && memory.lastIntent === "time") {
      const ans = `Still ${dayjs().format("HH:mm")}.`;
      memory.lastAnswer = ans;
      return ans;
    }

    // ---- TIME ----
    if (intent === "time") {
      const ans = random([
        `It’s ${dayjs().format("HH:mm")}.`,
        `Right now it’s ${dayjs().format("h:mm A")}.`,
        `${dayjs().format("HH:mm")}, roughly.`
      ]);
      memory.lastIntent = "time";
      memory.lastAnswer = ans;
      return ans;
    }

    // ---- DATE ----
    if (intent === "date") {
      const ans = random([
        `Today’s ${dayjs().format("dddd, MMMM D")}.`,
        `It’s ${dayjs().format("YYYY-MM-DD")}.`,
        `Today is ${dayjs().format("dddd")}.`
      ]);
      memory.lastIntent = "date";
      memory.lastAnswer = ans;
      return ans;
    }

    // ---- GREETING ----
    if (intent === "greeting") {
      const ans = random([
        "Hey. What’s on your mind?",
        "Hi — what’s going on?",
        "Yo. What do you want to talk about?"
      ]);
      memory.lastIntent = "greeting";
      return ans;
    }

    // ---- NAME ----
    if (intent === "name") {
      const ans = random([
        "I don’t really use a name.",
        "Never picked one. Didn’t feel necessary.",
        "Names make things weirdly formal."
      ]);
      memory.lastIntent = "name";
      return ans;
    }

    // ---- SHORT / VAGUE INPUT ----
    if (msg.length < 6) {
      return random([
        "You’re being vague.",
        "Want to add some context?",
        "That’s not much to go on."
      ]);
    }

    // ---- GENERIC QUESTIONS ----
    if (intent === "question") {
      return random([
        "That depends on what angle you’re looking from.",
        "There isn’t a single clean answer to that.",
        "Context matters more than people think."
      ]);
    }

    // ---- DEFAULT ----
    memory.lastIntent = "statement";
    return random([
      "I get the idea, but there’s more nuance there.",
      "That sounds reasonable on the surface.",
      "Yeah, I see why you’d think that.",
      "That tracks — assuming the usual constraints."
    ]);
  }

  return { reply };
}
