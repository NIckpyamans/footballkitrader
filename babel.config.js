module.exports = function (api) {
  const lifecycle = process.env.npm_lifecycle_event;
  const isNext = lifecycle === "build" || lifecycle === "dev" || lifecycle === "start";
  if (isNext) {
    api.cache.using(() => lifecycle);
    return { presets: ["next/babel"] };
  }
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"]
  };
};
