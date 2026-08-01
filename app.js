/* global Astronomy */

(() => {
  "use strict";

  const AU_KM = 149_597_870.7;
  const LIGHT_SECONDS_PER_AU = 499.004783836;
  const RAD_TO_DEG = 180 / Math.PI;
  const DEG_TO_RAD = Math.PI / 180;
  const TEXTURE_BUNDLES = {
    "./assets/maps/jupiter.jpg": "./assets/maps/embedded/jupiter.js",
    "./assets/maps/mars.jpg": "./assets/maps/embedded/mars.js",
    "./assets/maps/mercury.jpg": "./assets/maps/embedded/mercury.js",
    "./assets/maps/moon.jpg": "./assets/maps/embedded/moon.js",
    "./assets/maps/saturn.jpg": "./assets/maps/embedded/saturn.js",
    "./assets/maps/sun.jpg": "./assets/maps/embedded/sun.js",
    "./assets/maps/uranus.jpg": "./assets/maps/embedded/uranus.js",
    "./assets/maps/neptune.jpg": "./assets/maps/embedded/neptune.js",
  };

  const PLANETS = {
    Mercury: {
      body: Astronomy.Body.Mercury,
      diameterKm: 4_879.4,
      longitudeConvention: "W",
      label: "Mercury",
      mapTexture: "./assets/maps/mercury.jpg",
      polarRatio: 1,
      textureFallback: [132, 119, 101],
      textureAlt: "MESSENGER MDIS monochrome cylindrical map of Mercury",
      textureCredit: "ASU/MESSENGER Team/USGS",
      textureUrl:
        "https://astrogeology.usgs.gov/search/map/mercury_messenger_mdis_global_mosaic_250m",
      image: "./assets/planets/mercury.jpg",
      imageAlt: "MESSENGER global mosaic of Mercury",
      imageCredit: "NASA/JHUAPL/Carnegie/USGS/ASU",
      imageUrl:
        "https://science.nasa.gov/photojournal/full-global-mercury-mosaic/",
    },
    Venus: {
      body: Astronomy.Body.Venus,
      diameterKm: 12_103.6,
      longitudeConvention: "E",
      label: "Venus",
      polarRatio: 0.9999,
      proceduralTexture: {
        kind: "clouds",
        colors: [[232, 211, 159], [201, 169, 103], [241, 223, 181]],
      },
      image: "./assets/planets/venus.jpg",
      imageAlt: "Magellan radar-derived global view of Venus",
      imageCredit: "NASA/JPL",
      imageUrl:
        "https://science.nasa.gov/photojournal/venus-computer-simulated-global-view-of-the-northern-hemisphere/",
    },
    Mars: {
      body: Astronomy.Body.Mars,
      diameterKm: 6_792.4,
      longitudeConvention: "W",
      label: "Mars",
      mapTexture: "./assets/maps/mars.jpg",
      polarRatio: 0.9941,
      textureFallback: [177, 91, 61],
      textureAlt: "Viking colorized cylindrical map of Mars",
      textureCredit: "NASA/USGS",
      textureUrl:
        "https://astrogeology.usgs.gov/search/map/mars_viking_colorized_global_mosaic_232m",
      image: "./assets/planets/mars.jpg",
      imageAlt: "Viking Orbiter global color view of Mars",
      imageCredit: "NASA/JPL-Caltech/USGS",
      imageUrl: "https://science.nasa.gov/resource/global-color-views-of-mars/",
    },
    Jupiter: {
      body: Astronomy.Body.Jupiter,
      diameterKm: 142_984,
      longitudeConvention: "W",
      label: "Jupiter",
      note: "System III longitude",
      mapTexture: "./assets/maps/jupiter.jpg",
      polarRatio: 66_854 / 71_492,
      textureFallback: [199, 169, 132],
      textureAlt: "Cassini cylindrical map of Jupiter",
      textureCredit: "NASA/JPL/Space Science Institute",
      textureUrl:
        "https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map/",
      textureNote:
        "The System III orientation is current; cloud features are from Cassini observations in December 2000.",
      image: "./assets/planets/jupiter.jpg",
      imageAlt: "Cassini true-color portrait of Jupiter",
      imageCredit: "NASA/JPL/Space Science Institute",
      imageUrl:
        "https://science.nasa.gov/photojournal/cassini-jupiter-portrait/",
    },
    Saturn: {
      body: Astronomy.Body.Saturn,
      diameterKm: 120_536,
      longitudeConvention: "W",
      label: "Saturn",
      note: "System III longitude",
      mapTexture: "./assets/maps/saturn.jpg",
      polarRatio: 54_364 / 60_268,
      textureFallback: [218, 187, 132],
      textureAlt: "Warm color-balanced Hubble OPAL cylindrical map of Saturn",
      textureCredit: "NASA/ESA/Hubble OPAL/STScI",
      textureUrl:
        "https://archive.stsci.edu/hlsp/opal/opal-saturn-cycle-32",
      textureNote:
        "The globe uses the August 2025 Hubble OPAL map with its ring-obscured equatorial strip interpolated and a restrained warm color balance chosen to match Cassini's natural-color rings. Cloud features are archival; the System III face and pole orientation are calculated for the selected time.",
      ringTexture: "./assets/maps/saturn-rings.png",
      ringTextureCredit: "NASA/JPL/Space Science Institute",
      ringTextureUrl:
        "https://science.nasa.gov/photojournal/a-full-sweep-of-saturns-rings/",
      image: "./assets/planets/saturn.jpg",
      imageAlt: "Voyager 2 natural-color image of Saturn and its rings",
      imageCredit: "NASA/JPL/USGS",
      imageUrl:
        "https://science.nasa.gov/photojournal/saturn-and-4-icy-moons-in-natural-color/",
    },
    Uranus: {
      body: Astronomy.Body.Uranus,
      diameterKm: 51_118,
      longitudeConvention: "E",
      label: "Uranus",
      note: "System III longitude",
      mapTexture: "./assets/maps/uranus.jpg",
      polarRatio: 24_973 / 25_559,
      textureFallback: [128, 197, 204],
      textureAlt: "Hubble OPAL cylindrical color map of Uranus",
      textureCredit: "NASA/ESA/Hubble OPAL/STScI",
      textureUrl:
        "https://archive.stsci.edu/hlsp/opal/opal-uranus-cycle-32",
      textureNote:
        "The observed northern latitudes come from the November 2024 Hubble OPAL map. The unobserved southern region is filled with a neutral continuation of the measured cloud color, without invented storms.",
      image: "./assets/planets/uranus.jpg",
      imageAlt: "Voyager 2 color image of Uranus",
      imageCredit: "NASA/JPL",
      imageUrl: "https://science.nasa.gov/resource/uranus/",
    },
    Neptune: {
      body: Astronomy.Body.Neptune,
      diameterKm: 49_528,
      longitudeConvention: "W",
      label: "Neptune",
      note: "System III longitude",
      mapTexture: "./assets/maps/neptune.jpg",
      polarRatio: 24_341 / 24_764,
      textureFallback: [31, 70, 188],
      textureAlt:
        "Hubble OPAL cylindrical map of Neptune with a deep cobalt-blue color balance",
      textureCredit: "NASA/ESA/Hubble OPAL/STScI",
      textureUrl:
        "https://archive.stsci.edu/hlsp/opal/opal-neptune-cycle-32",
      textureNote:
        "The observed atmosphere comes from the August 2025 Hubble OPAL map. A deep cobalt-blue, Voyager-inspired color balance is applied for the familiar photographic appearance; cloud contrast is preserved. Its unobserved northern cap is filled with a neutral continuation rather than invented storms.",
      image: "./assets/planets/neptune.jpg",
      imageAlt: "Voyager 2 full-disk view of Neptune",
      imageCredit: "NASA/JPL",
      imageUrl: "https://science.nasa.gov/resource/neptune-full-disk-view/",
    },
    Moon: {
      body: Astronomy.Body.Moon,
      diameterKm: 3_474.8,
      longitudeConvention: "E",
      label: "Moon",
      note: "Selenographic longitude",
      mapTexture: "./assets/maps/moon.jpg",
      polarRatio: 1,
      textureFallback: [165, 161, 151],
      textureAlt: "LRO cylindrical color map of the Moon",
      textureCredit: "NASA/Goddard/SVS/LRO",
      textureUrl: "https://svs.gsfc.nasa.gov/4720/",
      image: "./assets/maps/moon.jpg",
      imageAlt: "LRO color map of the Moon",
      imageCredit: "NASA/Goddard/SVS/LRO",
      imageUrl: "https://svs.gsfc.nasa.gov/4720/",
    },
    Sun: {
      body: Astronomy.Body.Sun,
      diameterKm: 1_392_700,
      longitudeConvention: "E",
      label: "Sun",
      note: "IAU heliographic longitude",
      mapTexture: "./assets/maps/sun.jpg",
      polarRatio: 1,
      textureFallback: [245, 176, 85],
      textureAlt: "SOHO cylindrical synoptic intensity map of the Sun",
      textureCredit: "NASA/GSFC/SVS/SOHO",
      textureUrl: "https://svs.gsfc.nasa.gov/3505/",
      textureNote:
        "Solar orientation is calculated for the selected instant; the surface texture is an archival SOHO Carrington map used for 3D reference.",
      image: "./assets/planets/sun.jpg",
      imageAlt: "Full-disk image of the Sun from SDO",
      imageCredit: "NASA/GSFC/SDO",
      imageUrl:
        "https://science.nasa.gov/photojournal/image-of-sun-from-nasas-solar-dynamics-observatory/",
    },
  };

  const JUPITER_RADIUS_AU = 71_492 / AU_KM;
  const JUPITER_POLAR_RATIO = 66_854 / 71_492;
  const JUPITER_MOONS = [
    { key: "io", label: "Io", color: "#f5d28b", diameterKm: 3_643.2 },
    {
      key: "europa",
      label: "Europa",
      color: "#d8c7a7",
      diameterKm: 3_121.6,
    },
    {
      key: "ganymede",
      label: "Ganymede",
      color: "#ad9272",
      diameterKm: 5_268.2,
    },
    {
      key: "callisto",
      label: "Callisto",
      color: "#827467",
      diameterKm: 4_820.6,
    },
  ];

  const LOCATIONS = {
    "los-angeles": { lat: 34.0522, lon: -118.2437 },
    london: { lat: 51.5074, lon: -0.1278 },
    tokyo: { lat: 35.6762, lon: 139.6503 },
    sydney: { lat: -33.8688, lon: 151.2093 },
    "cape-town": { lat: -33.9249, lon: 18.4241 },
  };

  const elements = {};
  const textureCache = new Map();
  const textureBundleCache = new Map();
  const labelPlacementCache = new Map();
  const EQUIPMENT = window.PlanetaryEquipment ?? {
    cameras: [],
    telescopes: [],
  };
  const SAMPLED_MOONS = window.PlanetaryMoonEphemerides ?? {
    systems: {},
  };
  let renderVersion = 0;
  let timeAnchor;
  let playbackTimer;
  let playbackOffset;
  let playbackLastTimestamp;
  let playbackLastRender;

  function getElement(id) {
    return document.getElementById(id);
  }

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function magnitude(vector) {
    return Math.hypot(vector[0], vector[1], vector[2]);
  }

  function unit(vector) {
    const length = magnitude(vector);
    return vector.map((value) => value / length);
  }

  function cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }

  function wrap360(value) {
    return ((value % 360) + 360) % 360;
  }

  function signedAngleDelta(a, b) {
    return ((a - b + 540) % 360) - 180;
  }

  function localDateTimeValue(date) {
    const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return shifted.toISOString().slice(0, 19);
  }

  function initialCaptureTime() {
    const date = new Date();
    date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15, 0, 0);
    return localDateTimeValue(date);
  }

  function formatFov(degrees) {
    const arcminutes = degrees * 60;
    if (arcminutes >= 60) return `${degrees.toFixed(2)}°`;
    if (arcminutes >= 10) return `${arcminutes.toFixed(1)}′`;
    return `${arcminutes.toFixed(2)}′`;
  }

  function formatDuration(minutes) {
    if (!Number.isFinite(minutes) || minutes > 24 * 60) return "24 h+";
    if (minutes < 1) return `${Math.max(1, Math.round(minutes * 60))} sec`;
    if (minutes < 90) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const remaining = Math.round(minutes - hours * 60);
    return remaining ? `${hours} h ${remaining} min` : `${hours} h`;
  }

  function phaseLabel(fraction) {
    if (fraction > 0.98) return "Nearly full";
    if (fraction > 0.65) return "Gibbous";
    if (fraction > 0.35) return "Half lit";
    if (fraction > 0.1) return "Crescent";
    return "Thin crescent";
  }

  function formatUtc(date) {
    return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
  }

  function formatCentralLongitude(planet, orientation) {
    return `${orientation.displayLongitude.toFixed(2)}°${
      planet.longitudeConvention
    } · ${Math.abs(orientation.displaySubObserverLatitude).toFixed(2)}°${
      orientation.displaySubObserverLatitude >= 0 ? "N" : "S"
    }`;
  }

  function phaseNightPath(phaseAngle) {
    const cosine = Math.cos(phaseAngle * DEG_TO_RAD);
    const terminator = [];
    for (let index = 0; index <= 40; index += 1) {
      const normalizedY = 1 - (index / 40) * 2;
      const x = 50 - 50 * cosine * Math.sqrt(1 - normalizedY ** 2);
      const y = 50 + 50 * normalizedY;
      terminator.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return `M 50 0 A 50 50 0 0 0 50 100 L ${terminator.join(" L ")} Z`;
  }

  function saturnRingProjection(subObserverLatitude) {
    const opening = Math.max(
      0.012,
      Math.abs(Math.sin(subObserverLatitude * DEG_TO_RAD)),
    );

    // When the northern ring face is visible, its southern (screen-bottom)
    // half is nearest the observer. A southern view reverses that occlusion.
    const frontClip =
      subObserverLatitude >= 0
        ? "inset(50% 0 0 0)"
        : "inset(0 0 50% 0)";

    return { opening, frontClip };
  }

  function globeCoordinates(screenX, screenY, centralLongitude, subEarthLatitude) {
    const radiusSquared = screenX ** 2 + screenY ** 2;
    if (radiusSquared > 1) return undefined;

    // Keep source-map longitude sampling native. Pole position angle and moon
    // placement use their own astronomical east-left screen transforms.
    const east = screenX;
    const north = -screenY;
    const towardObserver = Math.sqrt(Math.max(0, 1 - radiusSquared));
    const longitude = centralLongitude * DEG_TO_RAD;
    const latitude = subEarthLatitude * DEG_TO_RAD;
    const center = [
      Math.cos(latitude) * Math.cos(longitude),
      Math.cos(latitude) * Math.sin(longitude),
      Math.sin(latitude),
    ];
    const eastAxis = [-Math.sin(longitude), Math.cos(longitude), 0];
    const northAxis = [
      -Math.sin(latitude) * Math.cos(longitude),
      -Math.sin(latitude) * Math.sin(longitude),
      Math.cos(latitude),
    ];
    const surface = [0, 1, 2].map(
      (index) =>
        towardObserver * center[index] +
        east * eastAxis[index] +
        north * northAxis[index],
    );

    return {
      east,
      north,
      towardObserver,
      longitude: Math.atan2(surface[1], surface[0]) * RAD_TO_DEG,
      latitude: Math.asin(surface[2]) * RAD_TO_DEG,
    };
  }

  function readTexturePixels(sourceUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        try {
          const source = document.createElement("canvas");
          source.width = image.naturalWidth;
          source.height = image.naturalHeight;
          const context = source.getContext("2d", {
            willReadFrequently: true,
          });
          context.drawImage(image, 0, 0);
          resolve(makeTextureSeamless({
            width: source.width,
            height: source.height,
            pixels: context.getImageData(0, 0, source.width, source.height)
              .data,
          }));
        } catch (error) {
          reject(error);
        }
      };
      image.onerror = () =>
        reject(new Error(`Unable to load texture ${sourceUrl.slice(0, 80)}`));
      image.src = sourceUrl;
    });
  }

  function makeTextureSeamless(texture) {
    const blendWidth = Math.max(
      2,
      Math.min(8, Math.floor(texture.width / 128)),
    );
    if (texture.width < blendWidth * 4) return texture;
    const pixels = new Uint8ClampedArray(texture.pixels);
    const leftAnchor = blendWidth;
    const rightAnchor = texture.width - blendWidth - 1;

    for (let y = 0; y < texture.height; y += 1) {
      for (let channel = 0; channel < 4; channel += 1) {
        const leftValue =
          pixels[(y * texture.width + leftAnchor) * 4 + channel];
        const rightValue =
          pixels[(y * texture.width + rightAnchor) * 4 + channel];
        const seamValue = (leftValue + rightValue) / 2;
        for (let offset = 0; offset < blendWidth; offset += 1) {
          const amount = offset / blendWidth;
          const leftIndex = (y * texture.width + offset) * 4 + channel;
          const rightIndex =
            (y * texture.width + texture.width - 1 - offset) * 4 + channel;
          pixels[leftIndex] =
            seamValue * (1 - amount) + pixels[leftIndex] * amount;
          pixels[rightIndex] =
            seamValue * (1 - amount) + pixels[rightIndex] * amount;
        }
      }
    }

    return { ...texture, pixels };
  }

  function loadBundledTexture(url) {
    const existing = window.PlanetaryTextureData?.[url];
    if (existing) return Promise.resolve(existing);
    if (textureBundleCache.has(url)) return textureBundleCache.get(url);

    const bundleUrl = TEXTURE_BUNDLES[url];
    if (!bundleUrl) {
      return Promise.reject(new Error(`No embedded texture bundle for ${url}`));
    }

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = bundleUrl;
      script.async = true;
      script.onload = () => {
        script.remove();
        const dataUrl = window.PlanetaryTextureData?.[url];
        if (dataUrl) {
          resolve(dataUrl);
        } else {
          reject(new Error(`Texture bundle did not define ${url}`));
        }
      };
      script.onerror = () => {
        script.remove();
        reject(new Error(`Unable to load embedded texture ${bundleUrl}`));
      };
      document.head.append(script);
    });
    textureBundleCache.set(url, promise);
    promise.catch(() => textureBundleCache.delete(url));
    return promise;
  }

  function loadTexture(url) {
    if (textureCache.has(url)) return textureCache.get(url);
    const promise = (async () => {
      if (window.location.protocol === "file:") {
        const dataUrl = await loadBundledTexture(url);
        return readTexturePixels(dataUrl);
      }
      try {
        return await readTexturePixels(url);
      } catch {
        const dataUrl = await loadBundledTexture(url);
        return readTexturePixels(dataUrl);
      }
    })();
    textureCache.set(url, promise);
    promise.catch(() => textureCache.delete(url));
    return promise;
  }

  function sampleTexture(texture, longitude, latitude) {
    const sourceX =
      (wrap360(longitude + 180) / 360) * texture.width - 0.5;
    const sourceY =
      ((90 - latitude) / 180) * texture.height - 0.5;
    const x0 = Math.floor(sourceX);
    const y0 = Math.max(0, Math.min(texture.height - 1, Math.floor(sourceY)));
    const x1 = x0 + 1;
    const y1 = Math.max(0, Math.min(texture.height - 1, y0 + 1));
    const mixX = sourceX - x0;
    const mixY = sourceY - Math.floor(sourceY);
    const wrappedX0 = ((x0 % texture.width) + texture.width) % texture.width;
    const wrappedX1 = ((x1 % texture.width) + texture.width) % texture.width;
    const samples = [
      (y0 * texture.width + wrappedX0) * 4,
      (y0 * texture.width + wrappedX1) * 4,
      (y1 * texture.width + wrappedX0) * 4,
      (y1 * texture.width + wrappedX1) * 4,
    ];

    return [0, 1, 2].map((channel) => {
      const top =
        texture.pixels[samples[0] + channel] * (1 - mixX) +
        texture.pixels[samples[1] + channel] * mixX;
      const bottom =
        texture.pixels[samples[2] + channel] * (1 - mixX) +
        texture.pixels[samples[3] + channel] * mixX;
      return top * (1 - mixY) + bottom * mixY;
    });
  }

  function interpolateColor(first, second, amount) {
    return first.map(
      (channel, index) => channel + (second[index] - channel) * amount,
    );
  }

  function proceduralColor(planet, point) {
    const texture = planet.proceduralTexture;
    const colors = texture.colors;
    if (texture.kind === "uniform") {
      const variation =
        0.42 +
        0.16 *
          ((Math.sin(point.latitude * DEG_TO_RAD * 2) +
            Math.cos(point.longitude * DEG_TO_RAD) * 0.35 +
            1.35) /
            2.7);
      return interpolateColor(colors[0], colors[1], variation);
    }
    if (texture.kind === "softBands") {
      const wave =
        0.5 +
        0.22 * Math.sin(point.latitude * DEG_TO_RAD * 5) +
        0.06 * Math.cos(point.longitude * DEG_TO_RAD * 2);
      return interpolateColor(
        interpolateColor(colors[0], colors[1], Math.max(0, Math.min(1, wave))),
        colors[2],
        0.12,
      );
    }
    if (texture.kind === "clouds") {
      const flow =
        (Math.sin(
          point.latitude * DEG_TO_RAD * 7 +
            Math.sin(point.longitude * DEG_TO_RAD * 2.5) * 1.2,
        ) +
          1) /
        2;
      const detail =
        (Math.sin(
          point.longitude * DEG_TO_RAD * 5 -
            point.latitude * DEG_TO_RAD * 3,
        ) +
          1) /
        2;
      return interpolateColor(
        interpolateColor(colors[0], colors[1], flow),
        colors[2],
        detail * 0.32,
      );
    }

    const bandPosition =
      ((point.latitude + 90) / 180) * (colors.length - 1) * 8;
    const baseIndex = Math.floor(bandPosition) % colors.length;
    const nextIndex = (baseIndex + 1) % colors.length;
    const blend = (bandPosition - Math.floor(bandPosition)) * 0.5;
    const bandColor = interpolateColor(
      colors[baseIndex],
      colors[nextIndex],
      blend,
    );
    const longitudeVariation =
      0.96 + 0.04 * Math.sin(point.longitude * DEG_TO_RAD * 2);
    return bandColor.map((channel) => channel * longitudeVariation);
  }

  async function paintMappedGlobe(result, version) {
    if (
      (!result.planet.mapTexture && !result.planet.proceduralTexture) ||
      (result.planet.mapTexture && typeof Image === "undefined")
    ) {
      return;
    }
    const canvas = getElement("target-canvas");
    if (!canvas || typeof canvas.getContext !== "function") return;

    try {
      let texture;
      if (result.planet.mapTexture) {
        try {
          texture = await loadTexture(result.planet.mapTexture);
        } catch {
          canvas.classList.add("texture-error");
        }
      }
      if (version !== renderVersion || canvas !== getElement("target-canvas")) {
        return;
      }
      const context = canvas.getContext("2d");
      if (!context || typeof context.createImageData !== "function") return;
      const output = context.createImageData(canvas.width, canvas.height);
      const relativeBrightLimb =
        signedAngleDelta(
          result.brightLimbPa,
          result.orientation.polePositionAngle,
        ) * DEG_TO_RAD;
      const phaseAngle =
        result.planet.body === Astronomy.Body.Sun
          ? 0
          : result.illumination.phase_angle * DEG_TO_RAD;
      const sunDirection = [
        Math.sin(phaseAngle) * Math.sin(relativeBrightLimb),
        Math.sin(phaseAngle) * Math.cos(relativeBrightLimb),
        Math.cos(phaseAngle),
      ];

      for (let y = 0; y < canvas.height; y += 1) {
        const screenY = ((y + 0.5) / canvas.height) * 2 - 1;
        for (let x = 0; x < canvas.width; x += 1) {
          const screenX = ((x + 0.5) / canvas.width) * 2 - 1;
          const point = globeCoordinates(
            screenX,
            screenY,
            result.orientation.eastLongitude,
            result.orientation.subObserverLatitude,
          );
          if (!point) continue;

          let color = texture
            ? sampleTexture(texture, point.longitude, point.latitude)
            : result.planet.proceduralTexture
              ? proceduralColor(result.planet, point)
              : result.planet.textureFallback;
          if (
            result.planet.textureFill &&
            Math.max(color[0], color[1], color[2]) < 16
          ) {
            color = result.planet.textureFill;
          }
          const outputIndex = (y * canvas.width + x) * 4;
          const incidence =
            point.east * sunDirection[0] +
            point.north * sunDirection[1] +
            point.towardObserver * sunDirection[2];
          const limb = 0.58 + 0.42 * Math.sqrt(point.towardObserver);
          const light =
            incidence > 0 ? (0.32 + 0.68 * Math.sqrt(incidence)) * limb : 0.018;
          output.data[outputIndex] = color[0] * light;
          output.data[outputIndex + 1] = color[1] * light;
          output.data[outputIndex + 2] = color[2] * light;
          output.data[outputIndex + 3] =
            Math.min(255, Math.max(0, (1 - Math.max(0, Math.hypot(screenX, screenY) - 0.985) / 0.015) * 255));
        }
      }
      context.putImageData(output, 0, 0);
    } catch {
      canvas.classList.add("texture-error");
    }
  }

  function compassDirection(azimuth) {
    const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return points[Math.round(azimuth / 45) % 8];
  }

  function skyQuality(altitude) {
    if (altitude >= 45) return { label: "High in the sky", tone: "good" };
    if (altitude >= 20) return { label: "Observable", tone: "good" };
    if (altitude > 0) return { label: "Low altitude", tone: "warn" };
    return { label: "Below horizon", tone: "bad" };
  }

  function parallacticAngle(body, date, observer, longitude) {
    const equatorial = Astronomy.Equator(body, date, observer, true, true);
    const hourAngle =
      signedAngleDelta(
        (Astronomy.SiderealTime(date) + longitude / 15 - equatorial.ra) * 15,
        0,
      ) * DEG_TO_RAD;
    const dec = equatorial.dec * DEG_TO_RAD;
    const lat = observer.latitude * DEG_TO_RAD;
    return (
      Math.atan2(
        Math.sin(hourAngle),
        Math.tan(lat) * Math.cos(dec) -
          Math.sin(dec) * Math.cos(hourAngle),
      ) * RAD_TO_DEG
    );
  }

  function brightLimbPositionAngle(body, date, observer) {
    const planet = Astronomy.Equator(body, date, observer, true, true);
    const sun = Astronomy.Equator(
      Astronomy.Body.Sun,
      date,
      observer,
      true,
      true,
    );
    const planetDec = planet.dec * DEG_TO_RAD;
    const sunDec = sun.dec * DEG_TO_RAD;
    const rightAscensionDelta = (sun.ra - planet.ra) * 15 * DEG_TO_RAD;
    return wrap360(
      Math.atan2(
        Math.cos(sunDec) * Math.sin(rightAscensionDelta),
        Math.sin(sunDec) * Math.cos(planetDec) -
          Math.cos(sunDec) *
            Math.sin(planetDec) *
            Math.cos(rightAscensionDelta),
      ) * RAD_TO_DEG,
    );
  }

  function skyBasis(vector) {
    const lineOfSight = unit(vector);
    const celestialPole = [0, 0, 1];
    const northOnSky = unit(
      celestialPole.map(
        (value, index) =>
          value - dot(celestialPole, lineOfSight) * lineOfSight[index],
      ),
    );
    const eastOnSky = unit(cross(celestialPole, lineOfSight));
    return { lineOfSight, northOnSky, eastOnSky };
  }

  function calculateOrientation(planet, date, observer, distanceAu) {
    const lightDeparture = new Date(
      date.getTime() - distanceAu * LIGHT_SECONDS_PER_AU * 1000,
    );
    const axis = Astronomy.RotationAxis(planet.body, lightDeparture);
    const topocentricJ2000 = Astronomy.Equator(
      planet.body,
      date,
      observer,
      false,
      true,
    );
    const towardObserver = [
      -topocentricJ2000.vec.x,
      -topocentricJ2000.vec.y,
      -topocentricJ2000.vec.z,
    ];

    const poleRa = axis.ra * 15 * DEG_TO_RAD;
    const poleDec = axis.dec * DEG_TO_RAD;
    const spin = wrap360(axis.spin) * DEG_TO_RAD;
    const referenceP = [
      Math.cos(poleRa) * Math.sin(poleDec),
      Math.sin(poleRa) * Math.sin(poleDec),
      -Math.cos(poleDec),
    ];
    const referenceQ = [-Math.sin(poleRa), Math.cos(poleRa), 0];
    const pole = [
      Math.cos(poleDec) * Math.cos(poleRa),
      Math.cos(poleDec) * Math.sin(poleRa),
      Math.sin(poleDec),
    ];
    const primeMeridian = [0, 1, 2].map(
      (index) =>
        Math.cos(spin) * referenceQ[index] -
        Math.sin(spin) * referenceP[index],
    );
    const eastAxis = [0, 1, 2].map(
      (index) =>
        -Math.sin(spin) * referenceQ[index] -
        Math.cos(spin) * referenceP[index],
    );

    const eastLongitude = wrap360(
      Math.atan2(
        dot(towardObserver, eastAxis),
        dot(towardObserver, primeMeridian),
      ) * RAD_TO_DEG,
    );
    const displayLongitude =
      planet.longitudeConvention === "E"
        ? eastLongitude
        : wrap360(360 - eastLongitude);
    const subObserverLatitude =
      Math.asin(dot(towardObserver, pole) / magnitude(towardObserver)) *
      RAD_TO_DEG;
    const displaySubObserverLatitude =
      Math.atan(
        Math.tan(subObserverLatitude * DEG_TO_RAD) /
          (planet.polarRatio ?? 1) ** 2,
      ) * RAD_TO_DEG;

    const toDate = Astronomy.Rotation_EQJ_EQD(date);
    const targetOfDate = Astronomy.RotateVector(toDate, topocentricJ2000.vec);
    const poleOfDate = Astronomy.RotateVector(toDate, axis.north);
    const lineOfSight = unit([
      targetOfDate.x,
      targetOfDate.y,
      targetOfDate.z,
    ]);
    const celestialPole = [0, 0, 1];
    const northOnSky = unit(
      celestialPole.map(
        (value, index) =>
          value - dot(celestialPole, lineOfSight) * lineOfSight[index],
      ),
    );
    const eastOnSky = unit(cross(celestialPole, lineOfSight));
    const poleVector = [poleOfDate.x, poleOfDate.y, poleOfDate.z];
    const projectedPole = unit(
      poleVector.map(
        (value, index) => value - dot(poleVector, lineOfSight) * lineOfSight[index],
      ),
    );
    const polePositionAngle = wrap360(
      Math.atan2(
        dot(projectedPole, eastOnSky),
        dot(projectedPole, northOnSky),
      ) * RAD_TO_DEG,
    );

    return {
      eastLongitude,
      displayLongitude,
      subObserverLatitude,
      displaySubObserverLatitude,
      polePositionAngle,
      lightTimeMinutes: (distanceAu * LIGHT_SECONDS_PER_AU) / 60,
    };
  }

  function projectJupiterMoons(date) {
    const geocentricJupiter = Astronomy.GeoVector(
      Astronomy.Body.Jupiter,
      date,
      true,
    );
    const basis = skyBasis([
      geocentricJupiter.x,
      geocentricJupiter.y,
      geocentricJupiter.z,
    ]);
    const lightTimeMinutes =
      (magnitude([
        geocentricJupiter.x,
        geocentricJupiter.y,
        geocentricJupiter.z,
      ]) *
        LIGHT_SECONDS_PER_AU) /
      60;
    const emissionTime = new Date(
      date.getTime() - lightTimeMinutes * 60_000,
    );
    const moonInfo = Astronomy.JupiterMoons(emissionTime);

    return JUPITER_MOONS.map((moon) => {
      const state = moonInfo[moon.key];
      const relative = [state.x, state.y, state.z];
      const eastRadii = dot(relative, basis.eastOnSky) / JUPITER_RADIUS_AU;
      const northRadii = dot(relative, basis.northOnSky) / JUPITER_RADIUS_AU;
      const depthRadii = dot(relative, basis.lineOfSight) / JUPITER_RADIUS_AU;
      const diskMetric =
        eastRadii ** 2 + (northRadii / JUPITER_POLAR_RATIO) ** 2;
      const overDisk = diskMetric <= 1;
      const transiting = overDisk && depthRadii < 0;
      const occulted = overDisk && depthRadii >= 0;

      return {
        ...moon,
        eastRadii,
        northRadii,
        depthRadii,
        transiting,
        occulted,
      };
    });
  }

  function stumpffC(value) {
    if (value > 1e-8) {
      const root = Math.sqrt(value);
      return (1 - Math.cos(root)) / value;
    }
    if (value < -1e-8) {
      const root = Math.sqrt(-value);
      return (Math.cosh(root) - 1) / -value;
    }
    return 0.5 - value / 24 + value ** 2 / 720;
  }

  function stumpffS(value) {
    if (value > 1e-8) {
      const root = Math.sqrt(value);
      return (root - Math.sin(root)) / root ** 3;
    }
    if (value < -1e-8) {
      const root = Math.sqrt(-value);
      return (Math.sinh(root) - root) / root ** 3;
    }
    return 1 / 6 - value / 120 + value ** 2 / 5_040;
  }

  function propagateTwoBody(position, velocity, elapsedSeconds, mu) {
    const radius = magnitude(position);
    const speedSquared = dot(velocity, velocity);
    const radialVelocity = dot(position, velocity) / radius;
    const alpha = 2 / radius - speedSquared / mu;
    let elapsed = elapsedSeconds;

    if (alpha > 0) {
      const semiMajorAxis = 1 / alpha;
      const period = 2 * Math.PI * Math.sqrt(semiMajorAxis ** 3 / mu);
      elapsed = ((elapsed % period) + period * 1.5) % period - period / 2;
    }

    const rootMu = Math.sqrt(mu);
    let anomaly =
      Math.abs(alpha) > 1e-12
        ? rootMu * Math.abs(alpha) * elapsed
        : (rootMu * elapsed) / radius;

    for (let iteration = 0; iteration < 28; iteration += 1) {
      const z = alpha * anomaly ** 2;
      const c = stumpffC(z);
      const s = stumpffS(z);
      const value =
        (radius * radialVelocity / rootMu) * anomaly ** 2 * c +
        (1 - alpha * radius) * anomaly ** 3 * s +
        radius * anomaly -
        rootMu * elapsed;
      const derivative =
        (radius * radialVelocity / rootMu) *
          anomaly *
          (1 - z * s) +
        (1 - alpha * radius) * anomaly ** 2 * c +
        radius;
      const correction = value / derivative;
      anomaly -= correction;
      if (Math.abs(correction) < 1e-8) break;
    }

    const z = alpha * anomaly ** 2;
    const f = 1 - (anomaly ** 2 / radius) * stumpffC(z);
    const g = elapsed - (anomaly ** 3 / rootMu) * stumpffS(z);
    return position.map((value, index) => f * value + g * velocity[index]);
  }

  function nearestMoonState(states, julianDay) {
    let low = 0;
    let high = states.length - 1;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (states[middle][0] < julianDay) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    if (
      low > 0 &&
      Math.abs(states[low - 1][0] - julianDay) <
        Math.abs(states[low][0] - julianDay)
    ) {
      return states[low - 1];
    }
    return states[low];
  }

  function projectSampledMoons(planetKey, date) {
    const system = SAMPLED_MOONS.systems?.[planetKey];
    const planet = PLANETS[planetKey];
    if (!system || !planet) return { moons: [], limited: false };

    const geocentricPlanet = Astronomy.GeoVector(planet.body, date, true);
    const planetVector = [
      geocentricPlanet.x,
      geocentricPlanet.y,
      geocentricPlanet.z,
    ];
    const basis = skyBasis(planetVector);
    const lightTimeMinutes =
      (magnitude(planetVector) * LIGHT_SECONDS_PER_AU) / 60;
    const emissionTime = new Date(
      date.getTime() - lightTimeMinutes * 60_000,
    );
    const julianDay = 2_451_545 + new Astronomy.AstroTime(emissionTime).tt;
    let limited = false;

    const moons = system.moons.map((moon) => {
      const state = nearestMoonState(moon.states, julianDay);
      limited =
        limited ||
        julianDay < moon.states[0][0] ||
        julianDay > moon.states[moon.states.length - 1][0];
      const relative = propagateTwoBody(
        state.slice(1, 4),
        state.slice(4, 7),
        (julianDay - state[0]) * 86_400,
        system.gm,
      );
      const eastRadii = dot(relative, basis.eastOnSky) / system.radiusKm;
      const northRadii = dot(relative, basis.northOnSky) / system.radiusKm;
      const depthRadii = dot(relative, basis.lineOfSight) / system.radiusKm;
      const diskMetric =
        eastRadii ** 2 +
        (northRadii / (planet.polarRatio ?? 1)) ** 2;
      const overDisk = diskMetric <= 1;

      return {
        key: moon.key,
        label: moon.label,
        color: moon.color,
        diameterKm: moon.diameterKm,
        eastRadii,
        northRadii,
        depthRadii,
        transiting: overDisk && depthRadii < 0,
        occulted: overDisk && depthRadii >= 0,
      };
    });

    return { moons, limited };
  }

  const jupiterTransitCache = new Map();

  function cachedJupiterTransit(date, moons) {
    const key = Math.floor(date.getTime() / (30 * 60_000));
    if (!jupiterTransitCache.has(key)) {
      jupiterTransitCache.set(key, findJupiterTransit(date, moons));
      if (jupiterTransitCache.size > 96) {
        jupiterTransitCache.delete(jupiterTransitCache.keys().next().value);
      }
    }
    return jupiterTransitCache.get(key);
  }

  function projectPlanetMoons(planetKey, date) {
    const sampled = projectSampledMoons(planetKey, date);
    let moons = sampled.moons;
    let nextTransit;
    const animating = playbackTimer !== undefined;

    if (planetKey === "Jupiter") {
      const galileanMoons = projectJupiterMoons(date);
      moons = [...galileanMoons, ...moons];
      nextTransit = animating
        ? undefined
        : cachedJupiterTransit(date, galileanMoons);
    }
    if (!moons.length) return undefined;

    return {
      planetKey,
      moons,
      nextTransit,
      limited: sampled.limited,
      animating,
    };
  }

  function refineTransitBoundary(
    moonKey,
    startTime,
    endTime,
    targetState,
  ) {
    let low = startTime.getTime();
    let high = endTime.getTime();
    for (let index = 0; index < 14; index += 1) {
      const middle = (low + high) / 2;
      const moon = projectJupiterMoons(new Date(middle)).find(
        (item) => item.key === moonKey,
      );
      if (moon.transiting === targetState) {
        high = middle;
      } else {
        low = middle;
      }
    }
    return new Date(high);
  }

  function findTransitEnd(moonKey, start) {
    const stepMs = 5 * 60_000;
    let previous = new Date(start);
    for (
      let time = start.getTime() + stepMs;
      time <= start.getTime() + 10 * 60 * 60_000;
      time += stepMs
    ) {
      const current = new Date(time);
      const moon = projectJupiterMoons(current).find(
        (item) => item.key === moonKey,
      );
      if (!moon.transiting) {
        return refineTransitBoundary(
          moonKey,
          previous,
          current,
          false,
        );
      }
      previous = current;
    }
    return undefined;
  }

  function findJupiterTransit(date, currentMoons) {
    const ongoing = currentMoons.find((moon) => moon.transiting);
    const stepMs = 5 * 60_000;

    if (ongoing) {
      let afterFalse;
      let afterTrue = new Date(date);
      for (
        let time = date.getTime() - stepMs;
        time >= date.getTime() - 10 * 60 * 60_000;
        time -= stepMs
      ) {
        const candidate = new Date(time);
        const moon = projectJupiterMoons(candidate).find(
          (item) => item.key === ongoing.key,
        );
        if (!moon.transiting) {
          afterFalse = candidate;
          break;
        }
        afterTrue = candidate;
      }
      const start = afterFalse
        ? refineTransitBoundary(
            ongoing.key,
            afterFalse,
            afterTrue,
            true,
          )
        : new Date(date);
      return {
        moon: ongoing,
        start,
        end: findTransitEnd(ongoing.key, new Date(date)),
        ongoing: true,
      };
    }

    let previousMoons = currentMoons;
    let previousTime = new Date(date);
    for (
      let time = date.getTime() + stepMs;
      time <= date.getTime() + 3 * 24 * 60 * 60_000;
      time += stepMs
    ) {
      const currentTime = new Date(time);
      const currentMoonsAtTime = projectJupiterMoons(currentTime);
      for (const moon of currentMoonsAtTime) {
        const previousMoon = previousMoons.find(
          (item) => item.key === moon.key,
        );
        if (moon.transiting && !previousMoon.transiting) {
          const start = refineTransitBoundary(
            moon.key,
            previousTime,
            currentTime,
            true,
          );
          return {
            moon,
            start,
            end: findTransitEnd(moon.key, start),
            ongoing: false,
          };
        }
      }
      previousMoons = currentMoonsAtTime;
      previousTime = currentTime;
    }
    return undefined;
  }

  function calculateSnapshot(config) {
    const planet = PLANETS[config.planetKey];
    const date = new Date(config.captureTime);
    if (!planet || !Number.isFinite(date.getTime())) {
      throw new Error("Choose a valid capture time.");
    }
    if (
      !Number.isFinite(config.latitude) ||
      config.latitude < -90 ||
      config.latitude > 90 ||
      !Number.isFinite(config.longitude) ||
      config.longitude < -180 ||
      config.longitude > 180
    ) {
      throw new Error("Enter a valid latitude and longitude.");
    }
    if (
      config.sensorWidth <= 0 ||
      config.sensorHeight <= 0 ||
      config.pixelSize <= 0 ||
      config.nativeFocalLength <= 0 ||
      config.opticalFactor <= 0 ||
      config.effectiveFocalLength <= 0 ||
      !Number.isFinite(Number(config.sensorAngle ?? 0))
    ) {
      throw new Error(
        "Camera, focal length, and optical multiplier values must be greater than zero.",
      );
    }

    const observer = new Astronomy.Observer(
      config.latitude,
      config.longitude,
      0,
    );
    const equatorial = Astronomy.Equator(
      planet.body,
      date,
      observer,
      true,
      true,
    );
    const horizontal = Astronomy.Horizon(
      date,
      observer,
      equatorial.ra,
      equatorial.dec,
      "normal",
    );
    const topocentricJ2000 = Astronomy.Equator(
      planet.body,
      date,
      observer,
      false,
      true,
    );
    const illumination = Astronomy.Illumination(planet.body, date);
    const distanceAu = topocentricJ2000.dist;
    const angularDiameterArcsec =
      2 *
      Math.atan(planet.diameterKm / 2 / (distanceAu * AU_KM)) *
      RAD_TO_DEG *
      3600;
    const pixelScaleArcsec =
      2 *
      Math.atan(config.pixelSize / 1000 / 2 / config.effectiveFocalLength) *
      RAD_TO_DEG *
      3600;
    const diameterPixels = angularDiameterArcsec / pixelScaleArcsec;
    const sensorWidthMm = (config.sensorWidth * config.pixelSize) / 1000;
    const sensorHeightMm = (config.sensorHeight * config.pixelSize) / 1000;
    const fovWidthDeg =
      2 *
      Math.atan(sensorWidthMm / 2 / config.effectiveFocalLength) *
      RAD_TO_DEG;
    const fovHeightDeg =
      2 *
      Math.atan(sensorHeightMm / 2 / config.effectiveFocalLength) *
      RAD_TO_DEG;
    const orientation = calculateOrientation(planet, date, observer, distanceAu);
    const brightLimbPa = brightLimbPositionAngle(
      planet.body,
      date,
      observer,
    );
    const parallacticAngleAtCapture = parallacticAngle(
      planet.body,
      date,
      observer,
      config.longitude,
    );
    const framePositionAngle = wrap360(
      config.sensorAngle +
        (config.mount === "altaz" ? parallacticAngleAtCapture : 0),
    );
    const observerRegion =
      config.latitude > 0
        ? "Northern hemisphere"
        : config.latitude < 0
          ? "Southern hemisphere"
          : "Equator";

    const before = new Date(date.getTime() - 30_000);
    const after = new Date(date.getTime() + 30_000);
    const rotationBefore = parallacticAngle(
      planet.body,
      before,
      observer,
      config.longitude,
    );
    const rotationAfter = parallacticAngle(
      planet.body,
      after,
      observer,
      config.longitude,
    );
    const rotationRateDegPerMin = Math.abs(
      signedAngleDelta(rotationAfter, rotationBefore),
    );
    const planetRadiusPixels = Math.max(diameterPixels / 2, 0.5);
    const planetToleranceDeg =
      Math.atan(0.5 / planetRadiusPixels) * RAD_TO_DEG;
    const frameRadiusPixels =
      Math.hypot(config.sensorWidth, config.sensorHeight) / 2;
    const frameToleranceDeg = Math.atan(1 / frameRadiusPixels) * RAD_TO_DEG;
    const planetSafeMinutes =
      rotationRateDegPerMin < 0.00001
        ? Number.POSITIVE_INFINITY
        : planetToleranceDeg / rotationRateDegPerMin;
    const frameSafeMinutes =
      rotationRateDegPerMin < 0.00001
        ? Number.POSITIVE_INFINITY
        : frameToleranceDeg / rotationRateDegPerMin;
    const actualPreviewPercent =
      (diameterPixels / config.sensorWidth) * 100;
    const previewPercent = Math.max(0.35, actualPreviewPercent);
    const moonData = projectPlanetMoons(config.planetKey, date);

    return {
      planet,
      date,
      distanceAu,
      angularDiameterArcsec,
      pixelScaleArcsec,
      diameterPixels,
      fovWidthDeg,
      fovHeightDeg,
      altitude: horizontal.altitude,
      azimuth: horizontal.azimuth,
      orientation,
      illumination,
      brightLimbPa,
      parallacticAngle: parallacticAngleAtCapture,
      framePositionAngle,
      observerRegion,
      rotationRateDegPerMin,
      planetSafeMinutes,
      frameSafeMinutes,
      previewPercent,
      previewBoosted: previewPercent > actualPreviewPercent + 0.01,
      visibility: skyQuality(horizontal.altitude),
      sensorAspect: config.sensorWidth / config.sensorHeight,
      ringDiameterPixels:
        planet.body === Astronomy.Body.Saturn
          ? diameterPixels * 2.326
          : undefined,
      moonData,
    };
  }

  function stat(label, value, note) {
    return `
      <div class="stat">
        <span>${label}</span>
        <strong>${value}</strong>
        ${note ? `<small>${note}</small>` : ""}
      </div>
    `;
  }

  function readConfig() {
    const opticalFactor =
      elements.opticalMultiplier.value === "custom"
        ? Number(elements.customMultiplier.value)
        : Number(elements.opticalMultiplier.value);
    const nativeFocalLength = Number(elements.focalLength.value);
    return {
      planetKey: elements.planet.value,
      captureTime: elements.captureTime.value,
      sensorWidth: Number(elements.sensorWidth.value),
      sensorHeight: Number(elements.sensorHeight.value),
      pixelSize: Number(elements.pixelSize.value),
      nativeFocalLength,
      opticalFactor,
      effectiveFocalLength: nativeFocalLength * opticalFactor,
      sensorAngle: Number(elements.sensorAngle.value),
      latitude: Number(elements.latitude.value),
      longitude: Number(elements.longitude.value),
      mount: document.querySelector('input[name="mount"]:checked').value,
      showMoons: elements.showMoons.checked,
      showMoonLabels: elements.showMoonLabels.checked,
    };
  }

  function renderPlanetMoons(data, result) {
    if (!data) return "";
    const extent = Math.max(
      6,
      Math.ceil(
        Math.max(
          ...data.moons.flatMap((moon) => [
            Math.abs(moon.eastRadii),
            Math.abs(moon.northRadii),
          ]),
        ) * 1.1,
      ),
    );
    const appearances = {
      Mars: "#b96f50",
      Jupiter: "#d4b28b",
      Saturn: "#d6bd89",
      Uranus: "#83c5cb",
      Neptune: "#477fd1",
    };

    const moonMarkers = data.moons
      .map((moon) => {
        const left = Math.max(
          1.5,
          Math.min(98.5, 50 - (moon.eastRadii / extent) * 50),
        );
        const top = Math.max(
          12,
          Math.min(88, 50 - (moon.northRadii / extent) * 50),
        );
        const stateClass = moon.transiting
          ? "transiting"
          : moon.occulted
            ? "occulted"
            : "";
        return `
          <span
            class="moon-marker ${stateClass}"
            style="left:${left}%;top:${top}%;--moon-color:${moon.color}"
            title="${moon.label}"
          >
            <i></i>
            ${
              data.animating
                ? ""
                : `<b class="moon-system-label">${moon.label}</b>`
            }
          </span>
        `;
      })
      .join("");

    const moonRows = data.moons
      .map((moon) => {
        let status;
        if (moon.transiting) {
          status = "In transit";
        } else if (moon.occulted) {
          status = `Behind ${data.planetKey}`;
        } else {
          status = `${Math.abs(moon.eastRadii).toFixed(2)} planet radii ${
            moon.eastRadii >= 0 ? "E" : "W"
          }`;
        }
        return `
          <div>
            <dt><span class="moon-key" style="--moon-color:${moon.color}"></span>${moon.label}</dt>
            <dd>${status}</dd>
          </div>
        `;
      })
      .join("");

    const transitWindow = data.nextTransit
      ? `
        <div class="transit-callout">
          <span>${
            data.nextTransit.ongoing
              ? "Transit in progress"
              : "Next moon transit"
          }</span>
          <strong>${data.nextTransit.moon.label}</strong>
          <p>
            ${formatUtc(data.nextTransit.start)}
            ${
              data.nextTransit.end
                ? `– ${formatUtc(data.nextTransit.end)}`
                : ""
            }
          </p>
        </div>
      `
      : data.planetKey === "Jupiter" && !data.animating
        ? `
        <div class="transit-callout quiet">
          <span>Next moon transit</span>
          <strong>None found</strong>
          <p>No moon-center crossing was found in the next three days.</p>
        </div>
      `
        : "";
    const systemLabel = `${data.planetKey} moons`;
    const modelNote = data.limited
      ? " · outside sampled 2020–2041 interval"
      : "";

    return `
      <article class="detail-card moon-card">
        <div class="card-title">
          <span>${systemLabel}</span>
          <small>Light-time corrected · ±${extent} planet radii${modelNote}</small>
        </div>
        <div class="moon-system" aria-label="Moon positions around ${data.planetKey}">
          <div class="moon-orbit-line"></div>
          <div
            class="system-planet ${data.planetKey.toLowerCase()}"
            style="
              --system-planet-color:${appearances[data.planetKey]};
              --system-planet-width:${100 / extent}%;
              --system-planet-ratio:${result.planet.polarRatio ?? 1};
            "
            aria-hidden="true"
          ></div>
          ${moonMarkers}
          <span class="moon-direction moon-east">E</span>
          <span class="moon-direction moon-west">W</span>
        </div>
        <div class="moon-details">
          <dl>${moonRows}</dl>
          ${transitWindow}
        </div>
      </article>
    `;
  }

  function renderPreviewMoons(result, config) {
    if (!result.moonData || !config.showMoons) return "";
    const sensorAngle = result.framePositionAngle * DEG_TO_RAD;
    return result.moonData.moons
      .filter((moon) => !moon.occulted)
      .map((moon) => {
        const sensorEast =
          moon.eastRadii * Math.cos(sensorAngle) -
          moon.northRadii * Math.sin(sensorAngle);
        const sensorNorth =
          moon.eastRadii * Math.sin(sensorAngle) +
          moon.northRadii * Math.cos(sensorAngle);
        const left =
          50 +
          ((-sensorEast * result.diameterPixels) /
            2 /
            config.sensorWidth) *
            100;
        const top =
          50 -
          ((sensorNorth * result.diameterPixels) /
            2 /
            config.sensorHeight) *
            100;
        if (left < -2 || left > 102 || top < -2 || top > 102) return "";
        const moonDiameterPixels =
          result.diameterPixels *
          (moon.diameterKm / result.planet.diameterKm);
        const moonWidthPercent =
          (moonDiameterPixels / config.sensorWidth) * 100;
        const state = moon.transiting ? "transiting" : "";
        return `
          <span
            class="preview-moon ${state}"
            style="
              left:${left}%;
              top:${top}%;
              width:max(0.75px,${moonWidthPercent}%);
              --moon-color:${moon.color};
            "
            aria-label="${moon.label}${
              moon.transiting ? ", transiting Jupiter" : ""
            }"
            title="${moon.label}${moon.transiting ? " transit" : ""}"
          >
            ${
              config.showMoonLabels && !result.moonData.animating
                ? `<b class="preview-moon-label">${moon.label}</b>`
                : ""
            }
          </span>
        `;
      })
      .join("");
  }

  function rectangleOverlapArea(first, second) {
    return (
      Math.max(
        0,
        Math.min(first.right, second.right) -
          Math.max(first.left, second.left),
      ) *
      Math.max(
        0,
        Math.min(first.bottom, second.bottom) -
          Math.max(first.top, second.top),
      )
    );
  }

  function layoutMoonLabels() {
    const sensor = document.querySelector(".sensor-preview");
    if (sensor) {
      const sensorRect = sensor.getBoundingClientRect();
      const labels = [...sensor.querySelectorAll(".preview-moon-label")];
      placeCollisionSafeLabels(
        labels,
        sensorRect,
        [],
        `preview:${elements.planet.value}`,
      );
    }
    document.querySelectorAll(".moon-system").forEach((system) => {
      const systemRect = system.getBoundingClientRect();
      const labels = [...system.querySelectorAll(".moon-system-label")];
      const obstacles = [
        ...system.querySelectorAll(".system-planet, .moon-direction"),
      ].map((element) => element.getBoundingClientRect());
      placeCollisionSafeLabels(
        labels,
        systemRect,
        obstacles,
        `system:${elements.planet.value}`,
      );
    });
  }

  function placeCollisionSafeLabels(labels, boundary, occupied, cachePrefix) {
    const candidates = [
      {
        left: "calc(100% + 7px)",
        right: "auto",
        top: "50%",
        transform: "translateY(-50%)",
      },
      {
        left: "auto",
        right: "calc(100% + 7px)",
        top: "50%",
        transform: "translateY(-50%)",
      },
      {
        left: "50%",
        right: "auto",
        top: "-7px",
        transform: "translate(-50%, -100%)",
      },
      {
        left: "50%",
        right: "auto",
        top: "calc(100% + 7px)",
        transform: "translateX(-50%)",
      },
      {
        left: "calc(100% + 6px)",
        right: "auto",
        top: "-5px",
        transform: "translateY(-100%)",
      },
      {
        left: "auto",
        right: "calc(100% + 6px)",
        top: "-5px",
        transform: "translateY(-100%)",
      },
    ];

    for (const label of labels) {
      const cacheKey = `${cachePrefix}:${label.textContent}`;
      const previousIndex = labelPlacementCache.get(cacheKey);
      const evaluations = [];
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        Object.assign(label.style, candidate);
        const rect = label.getBoundingClientRect();
        const outside =
          Math.max(0, boundary.left + 3 - rect.left) +
          Math.max(0, rect.right - boundary.right + 3) +
          Math.max(0, boundary.top + 3 - rect.top) +
          Math.max(0, rect.bottom - boundary.bottom + 3);
        const overlap = occupied.reduce(
          (total, other) => total + rectangleOverlapArea(rect, other),
          0,
        );
        const score = outside * 10_000 + overlap;
        evaluations.push({ candidate, index, outside, overlap, rect, score });
      }
      const best = evaluations.reduce((current, candidate) =>
        candidate.score < current.score ? candidate : current,
      );
      const previous = evaluations[previousIndex];
      const chosen =
        previous &&
        previous.outside === 0 &&
        previous.score <= best.score + 12
          ? previous
          : best;
      Object.assign(label.style, chosen.candidate);
      labelPlacementCache.set(cacheKey, chosen.index);
      occupied.push(label.getBoundingClientRect());
    }
  }

  function render() {
    const version = ++renderVersion;
    try {
      const config = readConfig();
      elements.sensorAngleReference.textContent =
        config.mount === "altaz"
          ? "Clockwise from zenith-up"
          : "Eastward from celestial north";
      elements.effectiveFocal.textContent = Number.isFinite(
        config.effectiveFocalLength,
      )
        ? `${Math.round(config.effectiveFocalLength).toLocaleString()} mm`
        : "—";
      const result = calculateSnapshot(config);
      const ringTilt =
        result.planet.body === Astronomy.Body.Saturn
          ? result.illumination.ring_tilt ?? 0
          : 0;
      const ringProjection = saturnRingProjection(
        result.orientation.subObserverLatitude,
      );
      const saturnRings =
        result.planet.body === Astronomy.Body.Saturn
          ? `
            <img
              class="saturn-ring-plane saturn-ring-back"
              src="${result.planet.ringTexture}"
              style="--ring-opening:${ringProjection.opening}"
              alt=""
              aria-hidden="true"
            />
            <img
              class="saturn-ring-plane saturn-ring-front"
              src="${result.planet.ringTexture}"
              style="
                --ring-opening:${ringProjection.opening};
                clip-path:${ringProjection.frontClip};
              "
              alt=""
              aria-hidden="true"
            />
          `
          : "";
      const ringStat = result.ringDiameterPixels
        ? `${result.ringDiameterPixels.toFixed(1)} px with rings`
        : "equatorial disk";
      const saturnDetail =
        result.planet.body === Astronomy.Body.Saturn
          ? `<div><dt>Ring opening</dt><dd>${Math.abs(ringTilt).toFixed(
              2,
            )}° · ${
              result.orientation.subObserverLatitude >= 0
                ? "north face"
                : "south face"
            }</dd></div>`
          : "";
      const usesProjectedSphere = Boolean(
        result.planet.mapTexture || result.planet.proceduralTexture,
      );
      const phaseOverlay =
        !usesProjectedSphere &&
        result.planet.body !== Astronomy.Body.Sun
          ? `
            <svg
            class="phase-layer"
            viewBox="0 0 100 100"
            style="transform:rotate(${-(
                signedAngleDelta(
                  result.brightLimbPa,
                  result.framePositionAngle,
                ) + 90
              )}deg)"
              aria-hidden="true"
            >
              <path d="${phaseNightPath(
                result.illumination.phase_angle,
              )}"></path>
            </svg>
          `
          : "";
      const targetVisual = usesProjectedSphere
        ? `
          <canvas
            id="target-canvas"
            class="target-canvas"
            width="360"
            height="360"
            aria-label="${result.planet.label} with its calculated Earth-facing side and phase"
          ></canvas>
        `
        : `
          <img
            class="target-photo"
            src="${result.planet.image}"
            alt=""
            aria-hidden="true"
          />
        `;
      const trackingDetail =
        config.mount === "altaz"
          ? `${result.rotationRateDegPerMin.toFixed(3)}°/min`
          : "Compensated by mount";
      const trackingCallout =
        config.mount === "altaz"
          ? `
            <div class="tracking-callout">
              <span>Target-detail window</span>
              <strong>${formatDuration(result.planetSafeMinutes)}</strong>
              <p>
                0.5 px at the target limb · 1 px at the frame corners:
                ${formatDuration(
                  result.frameSafeMinutes,
                )}.
              </p>
            </div>
          `
          : `
            <div class="tracking-callout equatorial">
              <span>Tracking mode</span>
              <strong>No alt-az field rotation</strong>
            </div>
          `;
      const centralLongitude = formatCentralLongitude(
        result.planet,
        result.orientation,
      );
      const moonCard = renderPlanetMoons(result.moonData, result);
      const previewMoons = renderPreviewMoons(result, config);
      const phaseDescription =
        result.planet.body === Astronomy.Body.Sun
          ? "Full solar disk"
          : `${(result.illumination.phase_fraction * 100).toFixed(
              1,
            )}% · ${phaseLabel(result.illumination.phase_fraction)}`;
      const phaseAngleDescription =
        result.planet.body === Astronomy.Body.Sun
          ? "Not applicable"
          : `${result.illumination.phase_angle.toFixed(2)}°`;
      const cameraName = elements.camera.value || "Manual camera";
      const sourceLabel = "Visual source";
      const poleRelativeSensor = signedAngleDelta(
        result.orientation.polePositionAngle,
        result.framePositionAngle,
      );
      const frameReference =
        config.mount === "altaz"
          ? `local vertical · ${result.parallacticAngle.toFixed(2)}° P.A.`
          : "celestial north · 0.00° P.A.";
      const cameraRotationReference =
        config.mount === "altaz"
          ? "from zenith-up"
          : "east of celestial north";
      const observerPhrase =
        result.observerRegion === "Equator"
          ? "on the equator"
          : `in the ${result.observerRegion.toLowerCase()}`;
      const latitudeSystem =
        result.planet.body === Astronomy.Body.Moon
          ? "selenographic"
          : result.planet.body === Astronomy.Body.Sun
            ? "heliographic"
            : "planetographic";
      const centricLatitudeDetail =
        Math.abs(
          result.orientation.displaySubObserverLatitude -
            result.orientation.subObserverLatitude,
        ) > 0.005
          ? `
            <div>
              <dt>Planetocentric latitude</dt>
              <dd>
                ${result.orientation.subObserverLatitude.toFixed(
                  2,
                )}° planetocentric
              </dd>
            </div>
          `
          : "";

      elements.timeControls.remove();
      elements.layerControls.remove();
      elements.results.innerHTML = `
        <div class="workspace-grid">
          <article class="preview-card">
            <div class="preview-header">
              <div>
                <p>Calculated field of view</p>
                <h2>${result.planet.label} · ${result.angularDiameterArcsec.toFixed(
                  2,
                )}″ apparent diameter</h2>
              </div>
              <span class="visibility ${result.visibility.tone}">
                ${result.visibility.label}
              </span>
            </div>
            <div class="fov-viewport">
              <div
                class="sensor-preview"
                style="aspect-ratio:${result.sensorAspect};--planet-size:${
                  result.previewPercent
                }%"
              >
                ${previewMoons}
                <div
                  class="planet-stage"
                  aria-label="${result.planet.label} north pole at position angle ${poleRelativeSensor.toFixed(
                    1,
                  )} degrees from frame-up for an observer ${observerPhrase}"
                >
                  <div
                    class="body-rotation"
                    style="
                      transform:rotate(${-poleRelativeSensor}deg);
                      --polar-ratio:${result.planet.polarRatio ?? 1};
                    "
                    >
                      ${saturnRings}
                      ${targetVisual}
                    </div>
                    ${phaseOverlay}
                  </div>
              </div>
            </div>
          </article>

          <aside class="equipment-key" aria-label="Current view setup">
            <div class="key-heading">
              <span>Current view</span>
              <small>${result.date.toISOString().replace(".000", "")}</small>
            </div>
            <div class="key-target">
              <i aria-hidden="true"></i>
              <div>
                <strong>${result.planet.label}</strong>
                <small>${cameraName}</small>
                <p>
                  <b>${config.nativeFocalLength.toFixed(0)} mm telescope</b>
                  <b>${config.opticalFactor.toFixed(2)}× optics</b>
                  <b>${config.sensorWidth} × ${config.sensorHeight}</b>
                  <b>${config.sensorAngle.toFixed(
                    1,
                  )}° ${cameraRotationReference}</b>
                  <b>${
                    result.planet.mapTexture
                      ? "3D surface map"
                      : result.planet.proceduralTexture
                        ? "3D uniform model"
                        : "Phase-aware disk"
                  }</b>
                </p>
              </div>
            </div>
            <dl class="key-metrics">
              <div>
                <dt>Field of view</dt>
                <dd>${formatFov(result.fovWidthDeg)} × ${formatFov(
                  result.fovHeightDeg,
                )}</dd>
              </div>
              <div>
                <dt>Image scale</dt>
                <dd>${result.pixelScaleArcsec.toFixed(3)}″/px</dd>
              </div>
              <div>
                <dt>Target on sensor</dt>
                <dd>${result.diameterPixels.toFixed(1)} px</dd>
              </div>
              <div>
                <dt>Facing Earth</dt>
                <dd>${centralLongitude}</dd>
              </div>
              <div>
                <dt>Pole position angle</dt>
                <dd>${result.orientation.polePositionAngle.toFixed(2)}°</dd>
              </div>
              <div>
                <dt>Pole relative to sensor</dt>
                <dd>${poleRelativeSensor.toFixed(2)}°</dd>
              </div>
              <div>
                <dt>Frame-up reference</dt>
                <dd>${frameReference}</dd>
              </div>
            </dl>
            <a
              class="mission-reference"
              href="${result.planet.textureUrl ?? result.planet.imageUrl}"
              target="_blank"
              rel="noreferrer"
              title="Open the NASA source"
            >
              <img
                src="${result.planet.mapTexture ?? result.planet.image}"
                alt="${result.planet.textureAlt ?? result.planet.imageAlt}"
              />
              <span>
                <b>${sourceLabel}</b>
                <small>${
                  result.planet.textureCredit ?? result.planet.imageCredit
                }</small>
              </span>
            </a>
          </aside>
        </div>

        <div class="primary-stats">
          ${stat(
            "Apparent diameter",
            `${result.angularDiameterArcsec.toFixed(2)}″`,
            `at ${result.distanceAu.toFixed(4)} AU`,
          )}
          ${stat(
            "Diameter on sensor",
            `${result.diameterPixels.toFixed(1)} px`,
            ringStat,
          )}
          ${stat(
            "Image scale",
            `${result.pixelScaleArcsec.toFixed(3)}″/px`,
            `${config.nativeFocalLength} mm × ${config.opticalFactor.toFixed(
              2,
            )} = ${config.effectiveFocalLength.toFixed(0)} mm`,
          )}
          ${stat(
            "Sensor FOV",
            `${formatFov(result.fovWidthDeg)} × ${formatFov(
              result.fovHeightDeg,
            )}`,
            `${config.sensorWidth} × ${config.sensorHeight} px`,
          )}
        </div>

        <div class="detail-grid">
          <article class="detail-card">
            <div class="card-title">
              <span>Orientation</span>
              <small>Light-time corrected</small>
            </div>
            <dl>
              <div>
                <dt>Facing Earth</dt>
                <dd>Center ${centralLongitude}</dd>
              </div>
              <div>
                <dt>Sub-Earth latitude</dt>
                <dd>
                  ${result.orientation.displaySubObserverLatitude.toFixed(
                    2,
                  )}° ${latitudeSystem}
                </dd>
              </div>
              ${centricLatitudeDetail}
              <div>
                <dt>North pole P.A.</dt>
                <dd>${result.orientation.polePositionAngle.toFixed(2)}°</dd>
              </div>
              <div>
                <dt>Illuminated</dt>
                <dd>${phaseDescription}</dd>
              </div>
              <div>
                <dt>Phase angle</dt>
                <dd>${phaseAngleDescription}</dd>
              </div>
              ${saturnDetail}
            </dl>
          </article>

          <article class="detail-card">
            <div class="card-title">
              <span>Sky &amp; tracking</span>
              <small>${result.date.toISOString().replace(".000", "")}</small>
            </div>
            <dl>
              <div>
                <dt>Altitude</dt>
                <dd>${result.altitude.toFixed(1)}°</dd>
              </div>
              <div>
                <dt>Azimuth</dt>
                <dd>
                  ${result.azimuth.toFixed(1)}°
                  ${compassDirection(result.azimuth)}
                </dd>
              </div>
              <div>
                <dt>Earth distance</dt>
                <dd>
                  ${result.distanceAu.toFixed(4)} AU ·
                  ${(result.distanceAu * AU_KM / 1_000_000).toFixed(1)}M km
                </dd>
              </div>
              <div>
                <dt>Field rotation</dt>
                <dd>${trackingDetail}</dd>
              </div>
              <div>
                <dt>Observer frame</dt>
                <dd>${result.observerRegion}</dd>
              </div>
              <div>
                <dt>Parallactic angle</dt>
                <dd>${result.parallacticAngle.toFixed(2)}°</dd>
              </div>
            </dl>
            ${trackingCallout}
          </article>
        </div>
        ${moonCard}
      `;
      elements.results
        .querySelector(".fov-viewport")
        .after(elements.layerControls, elements.timeControls);
      paintMappedGlobe(result, version);
      requestAnimationFrame(layoutMoonLabels);
    } catch (error) {
      elements.timeControls.remove();
      elements.layerControls.remove();
      elements.results.innerHTML = `
        <div class="error-card">
          <span>Check your setup</span>
          <p>${error instanceof Error ? error.message : "Unable to calculate."}</p>
        </div>
      `;
      elements.results.append(elements.layerControls, elements.timeControls);
    }
  }

  function matchEquipment(items, label) {
    const normalized = label.trim().toLocaleLowerCase();
    return items.find(
      (item) => item.label.toLocaleLowerCase() === normalized,
    );
  }

  function chooseCamera() {
    const camera = matchEquipment(EQUIPMENT.cameras, elements.camera.value);
    if (camera) {
      elements.sensorWidth.value = camera.width;
      elements.sensorHeight.value = camera.height;
      elements.pixelSize.value = camera.pixelWidth;
    }
    render();
  }

  function chooseTelescope() {
    const telescope = matchEquipment(
      EQUIPMENT.telescopes,
      elements.telescope.value,
    );
    if (telescope) {
      elements.focalLength.value = telescope.focalLength;
    }
    render();
  }

  function populateEquipmentDatalists() {
    const cameraFragment = document.createDocumentFragment();
    for (const camera of EQUIPMENT.cameras) {
      const option = document.createElement("option");
      option.value = camera.label;
      cameraFragment.append(option);
    }
    elements.cameraOptions.append(cameraFragment);

    const telescopeFragment = document.createDocumentFragment();
    for (const telescope of EQUIPMENT.telescopes) {
      const option = document.createElement("option");
      option.value = telescope.label;
      telescopeFragment.append(option);
    }
    elements.telescopeOptions.append(telescopeFragment);
    elements.equipmentDatabaseNote.textContent =
      `${EQUIPMENT.cameras.length.toLocaleString()} cameras · ` +
      `${EQUIPMENT.telescopes.length.toLocaleString()} telescopes`;
  }

  function formatTimeOffset(minutes) {
    if (!minutes) return "Capture time";
    const sign = minutes > 0 ? "+" : "−";
    const absoluteSeconds = Math.round(Math.abs(minutes) * 60);
    if (absoluteSeconds % 86_400 === 0) {
      return `${sign}${absoluteSeconds / 86_400} d`;
    }
    if (absoluteSeconds % 3_600 === 0) {
      return `${sign}${absoluteSeconds / 3_600} h`;
    }
    if (absoluteSeconds >= 3_600) {
      return `${sign}${(absoluteSeconds / 3_600).toFixed(2)} h`;
    }
    if (absoluteSeconds >= 60) {
      return `${sign}${(absoluteSeconds / 60).toFixed(1)} min`;
    }
    return `${sign}${absoluteSeconds} sec`;
  }

  function updateTimeScrubberLabel() {
    elements.timeScrubberLabel.textContent = formatTimeOffset(
      Number(elements.timeScrubber.value),
    );
  }

  function stopPlayback() {
    if (playbackTimer !== undefined) {
      window.cancelAnimationFrame(playbackTimer);
      playbackTimer = undefined;
    }
    playbackLastTimestamp = undefined;
    playbackLastRender = undefined;
    if (elements.timePlay) {
      elements.timePlay.textContent = "Play";
      elements.timePlay.setAttribute("aria-pressed", "false");
    }
  }

  function applyTimeOffset(offsetMinutes) {
    if (!(timeAnchor instanceof Date) || !Number.isFinite(timeAnchor.getTime())) {
      timeAnchor = new Date(elements.captureTime.value);
    }
    const minimum = Number(elements.timeScrubber.min);
    const maximum = Number(elements.timeScrubber.max);
    const nextOffset = Math.max(
      minimum,
      Math.min(maximum, Math.round(offsetMinutes * 60) / 60),
    );
    elements.timeScrubber.value = nextOffset;
    elements.captureTime.value = localDateTimeValue(
      new Date(timeAnchor.getTime() + nextOffset * 60_000),
    );
    updateTimeScrubberLabel();
    render();
    return nextOffset > minimum && nextOffset < maximum;
  }

  function handleCaptureTimeInput() {
    stopPlayback();
    const selected = new Date(elements.captureTime.value);
    if (Number.isFinite(selected.getTime())) {
      timeAnchor = selected;
      elements.timeScrubber.value = 0;
      updateTimeScrubberLabel();
    }
    render();
  }

  function shiftTime(minutes) {
    stopPlayback();
    applyTimeOffset(Number(elements.timeScrubber.value) + minutes);
  }

  function togglePlayback() {
    if (playbackTimer !== undefined) {
      stopPlayback();
      render();
      return;
    }
    elements.timePlay.textContent = "Pause";
    elements.timePlay.setAttribute("aria-pressed", "true");
    playbackOffset = Number(elements.timeScrubber.value);
    playbackTimer = window.requestAnimationFrame(advancePlayback);
  }

  function handlePlayPointerDown(event) {
    if (!event.isPrimary) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    elements.timePlay.focus({ preventScroll: true });
    togglePlayback();
  }

  function handlePlayClick(event) {
    // Pointer activation is handled before an animated render can detach the
    // button. A zero-detail click is keyboard or assistive-tech activation.
    if (event.detail === 0) togglePlayback();
  }

  function advancePlayback(timestamp) {
    if (playbackTimer === undefined) return;
    if (playbackLastTimestamp === undefined) {
      playbackLastTimestamp = timestamp;
      playbackLastRender = timestamp - 100;
    } else {
      const elapsedSeconds = Math.min(
        0.25,
        (timestamp - playbackLastTimestamp) / 1_000,
      );
      playbackLastTimestamp = timestamp;
      playbackOffset += elapsedSeconds * Number(elements.timeSpeed.value);
    }

    if (timestamp - playbackLastRender >= 60) {
      playbackLastRender = timestamp;
      if (!applyTimeOffset(playbackOffset)) {
        stopPlayback();
        render();
        return;
      }
    }
    playbackTimer = window.requestAnimationFrame(advancePlayback);
  }

  function chooseLocation() {
    const location = LOCATIONS[elements.location.value];
    elements.locationStatus.textContent = "";
    if (location) {
      elements.latitude.value = location.lat;
      elements.longitude.value = location.lon;
    }
    render();
  }

  function chooseOpticalMultiplier() {
    const isCustom = elements.opticalMultiplier.value === "custom";
    elements.customMultiplierWrap.hidden = !isCustom;
    render();
  }

  function useDeviceLocation() {
    if (!navigator.geolocation) {
      elements.locationStatus.textContent =
        "Location is not available in this browser.";
      return;
    }
    elements.locationStatus.textContent = "Finding your location…";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        elements.latitude.value = position.coords.latitude.toFixed(5);
        elements.longitude.value = position.coords.longitude.toFixed(5);
        elements.location.value = "custom";
        elements.locationStatus.textContent = "Device location applied.";
        render();
      },
      () => {
        elements.locationStatus.textContent =
          "Location permission was not granted.";
      },
      { enableHighAccuracy: false, timeout: 10_000 },
    );
  }

  function initialize() {
    Object.assign(elements, {
      planet: getElement("planet"),
      captureTime: getElement("capture-time"),
      timeControls: getElement("time-controls"),
      layerControls: getElement("preview-layer-controls"),
      timeScrubber: getElement("time-scrubber"),
      timeScrubberLabel: getElement("time-scrubber-label"),
      timeMinus: getElement("time-minus"),
      timePlay: getElement("time-play"),
      timePlus: getElement("time-plus"),
      timeSpeed: getElement("time-speed"),
      showMoons: getElement("show-moons"),
      showMoonLabels: getElement("show-moon-labels"),
      camera: getElement("camera"),
      cameraOptions: getElement("camera-options"),
      telescope: getElement("telescope"),
      telescopeOptions: getElement("telescope-options"),
      equipmentDatabaseNote: getElement("equipment-database-note"),
      sensorWidth: getElement("sensor-width"),
      sensorHeight: getElement("sensor-height"),
      pixelSize: getElement("pixel-size"),
      focalLength: getElement("focal-length"),
      sensorAngle: getElement("sensor-angle"),
      sensorAngleReference: getElement("sensor-angle-reference"),
      opticalMultiplier: getElement("optical-multiplier"),
      customMultiplier: getElement("custom-multiplier"),
      customMultiplierWrap: getElement("custom-multiplier-wrap"),
      effectiveFocal: getElement("effective-focal"),
      location: getElement("location"),
      latitude: getElement("latitude"),
      longitude: getElement("longitude"),
      useLocation: getElement("use-location"),
      locationStatus: getElement("location-status"),
      results: getElement("results"),
    });

    elements.captureTime.value = initialCaptureTime();
    timeAnchor = new Date(elements.captureTime.value);
    populateEquipmentDatalists();
    updateTimeScrubberLabel();

    elements.planet.addEventListener("change", render);
    elements.captureTime.addEventListener("input", handleCaptureTimeInput);
    elements.timeScrubber.addEventListener("input", () => {
      stopPlayback();
      applyTimeOffset(Number(elements.timeScrubber.value));
    });
    elements.timeMinus.addEventListener("click", () => shiftTime(-60));
    elements.timePlus.addEventListener("click", () => shiftTime(60));
    elements.timePlay.addEventListener("pointerdown", handlePlayPointerDown);
    elements.timePlay.addEventListener("click", handlePlayClick);
    elements.showMoons.addEventListener("change", () => {
      elements.showMoonLabels.disabled = !elements.showMoons.checked;
      render();
    });
    elements.showMoonLabels.addEventListener("change", render);
    elements.focalLength.addEventListener("input", () => {
      elements.telescope.value = "Manual telescope";
      render();
    });
    elements.sensorAngle.addEventListener("input", render);
    elements.opticalMultiplier.addEventListener(
      "change",
      chooseOpticalMultiplier,
    );
    elements.customMultiplier.addEventListener("input", render);
    elements.camera.addEventListener("change", chooseCamera);
    elements.telescope.addEventListener("change", chooseTelescope);
    elements.location.addEventListener("change", chooseLocation);
    elements.useLocation.addEventListener("click", useDeviceLocation);

    [elements.sensorWidth, elements.sensorHeight, elements.pixelSize].forEach(
      (input) => {
        input.addEventListener("input", () => {
          elements.camera.value = "Manual camera";
          render();
        });
      },
    );

    [elements.latitude, elements.longitude].forEach((input) => {
      input.addEventListener("input", () => {
        elements.location.value = "custom";
        render();
      });
    });

    document.querySelectorAll('input[name="mount"]').forEach((input) => {
      input.addEventListener("change", render);
    });
    window.addEventListener("resize", () =>
      requestAnimationFrame(layoutMoonLabels),
    );

    render();
  }

  window.PlanetaryFrame = {
    calculateSnapshot,
    globeCoordinates,
    proceduralColor,
    projectPlanetMoons,
    projectJupiterMoons,
    propagateTwoBody,
    saturnRingProjection,
  };
  document.addEventListener("DOMContentLoaded", initialize);
})();
