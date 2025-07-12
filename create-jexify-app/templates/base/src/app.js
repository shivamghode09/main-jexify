import { button, div, h1, img, p, useMinor } from "jexify";
import jexifyLogo from "/jexify.svg";
import "./_styles.css";

// Constants for static values
const CURRENT_YEAR = new Date().getFullYear();
const COPYRIGHT_TEXT = `© ${CURRENT_YEAR} JEXIFY | Happy coding`;

const App = () => {
  // Using useMinor for state management
  const [count, setCount] = useMinor(0);

  // Handler for incrementing count
  const incrementCount = () => setCount((prev) => prev + 1);

  // Build DOM structure
  return div({ className: "container" }, [
    img({
      src: jexifyLogo,
      className: "logo",
      alt: "JEXIFY Logo",
      loading: "lazy",
    }),

    h1({ className: "title" }, "Welcome to Jexify"),

    div(
      { className: "btn-container" },
      button(
        {
          onclick: incrementCount,
          ariaLabel: `Increment counter to ${count + 1}`,
        },
        `Count is ${count}`
      )
    ),

    p({ className: "footer" }, COPYRIGHT_TEXT),
  ]).build();
};

export default App;
