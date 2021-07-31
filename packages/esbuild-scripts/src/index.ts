#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

void (async () => {
  switch (process.argv[2]) {
    case "start": {
      // @ts-ignore - we ignore this because we are the ones assigning it and making
      // it a read only property.
      process.env.NODE_ENV = "development";

      await import("./config/env");

      return import("./start/index");
    }
    case "build": {
      // @ts-ignore - we ignore this because we are the ones assigning it and making
      // it a read only property.
      process.env.NODE_ENV = "production";

      await import("./config/env");

      return import("./build/index");
    }
    default: {
      if (process.argv.includes("--help")) {
        console.log("Help");
      } else {
        throw new Error(`${process.argv[2]} is not recognized`);
      }
    }
  }
})();
