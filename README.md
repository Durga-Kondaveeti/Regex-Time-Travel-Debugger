# Regex Time-Travel Debugger ⏳

**Live Demo:** [https://durga-kondaveeti.github.io/Regex-Time-Travel-Debugger/](https://durga-kondaveeti.github.io/Regex-Time-Travel-Debugger/)

A visual, interactive tool to understand the "hidden life" of Regular Expressions. This project breaks down the execution of a regex engine step-by-step, helping developers visualize backtracking, recursion, and pattern matching in real-time.

*(Note: You can replace this image link with a real screenshot of your app later)*

---

## 💡 Why I Built This

Regular Expressions (Regex) often feel like "magic"—you type a pattern, and it either matches or it doesn't. But underneath, the engine is performing a complex dance of consumption, validation, and backtracking.

I built this project because:

* **The internal logic is fascinating:** I wanted to see exactly *how* a regex engine traverses a string, character by character.
* **Visual learning is faster:** It is much easier for beginners to learn Regex concepts (especially "greedy" vs. "lazy" matching) when they can watch the engine make decisions in real-time.
* **Debugging is hard:** Understanding why a specific regex fails (or runs infinitely in catastrophic backtracking) is nearly impossible without visualizing the steps.

## ✨ Features

* **Step-by-Step Visualization:** Watch the regex engine consume characters and move through the pattern state-by-state.
* **"Time Travel" Controls:** Play, pause, and scrub through the timeline of the execution.
* **Backtracking Visuals:** Clearly highlights when the engine hits a dead end and has to "backtrack" to try a different path.
* **Adjustable Speed:** Slow down the animation (1.5s per step) to follow the logic or speed it up to see the result.
* **Success/Failure Status:** clearly indicates if the pattern successfully matched the text or failed after exhausting all options.
* **Catastrophic Backtracking Detection:** Warns users if a pattern is generating excessive steps (infinite loops).

## 📖 How to Use

1. Open the [Live Website](https://durga-kondaveeti.github.io/Regex-Time-Travel-Debugger/).
2. Enter a **Regular Expression** in the first box.
3. Enter a **Test String** in the second box.
4. Click the **Play** button or use the slider to move through the steps manually.

### Examples to Try

**Example 1: The Greedy Match**

* **Regex:** `a+b+c`
* **String:** `aaabbbc`
* *What to watch:* See how `a+` greedily eats all the 'a's, then hands control over to `b+`.

**Example 2: The Backtrack**

* **Regex:** `Zsa`
* **String:** `aaZaZsab`
* *What to watch:* The engine will scan the string. It will try to match 'Z' at index 0 (fail), index 1 (fail), index 2 (match!), but then fail on 's', causing it to backtrack and resume searching later in the string until it finally succeeds at the end.

## 🛠️ Local Development Setup

Follow these steps to run the project on your local machine.

**Prerequisites:**

* Node.js (v14 or higher)
* npm or yarn

**Installation:**

1. **Clone the repository:**
```bash
git clone https://github.com/durga-kondaveeti/Regex-Time-Travel-Debugger.git
cd Regex-Time-Travel-Debugger

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```


4. **Open in Browser:**
The terminal will show a local URL (usually `http://localhost:5173`). Open that link to start debugging!

## 🔮 Future Features

* **Escape Character Analysis:** Support for `\d`, `\w`, `\s` and escaped literals (e.g., `\.`).
* **Capture Groups:** Visualizing how `( )` groups store data during execution.
* **Lazy Quantifiers:** Adding support for `*?` and `+?` to visualize non-greedy matching.

## 🤝 Contributing

Contributions are welcome! If you have ideas for better visualization or new engine features, feel free to open an issue or submit a pull request.

---

*Built with ❤️ by Durga Shankar Kondaveeti*
