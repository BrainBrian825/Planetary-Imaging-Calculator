"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  Body,
  Equator,
  Horizon,
  Illumination,
  Observer,
  RotateVector,
  RotationAxis,
  Rotation_EQJ_EQD,
  SiderealTime,
} from "astronomy-engine";

const AU_KM = 149_597_870.7;
const LIGHT_SECONDS_PER_AU = 499.004783836;
const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

type PlanetSpec = {
  body: Body;
  diameterKm: number;
  longitudeConvention: "E" | "W";
  label: string;
  note?: string;
};

const PLANETS: Record<string, PlanetSpec> = {
  Mercury: {
    body: Body.Mercury,
    diameterKm: 4_879.4,
    longitudeConvention: "W",
    label: "Mercury",
  },
  Venus: {
    body: Body.Venus,
    diameterKm: 12_103.6,
    longitudeConvention: "E",
    label: "Venus",
  },
  Mars: {
    body: Body.Mars,
    diameterKm: 6_792.4,
    longitudeConvention: "W",
    label: "Mars",
  },
  Jupiter: {
    body: Body.Jupiter,
    diameterKm: 142_984,
    longitudeConvention: "W",
    label: "Jupiter",
    note: "System III longitude",
  },
  Saturn: {
    body: Body.Saturn,
    diameterKm: 120_536,
    longitudeConvention: "W",
    label: "Saturn",
    note: "System III longitude",
  },
  Uranus: {
    body: Body.Uranus,
    diameterKm: 51_118,
    longitudeConvention: "E",
    label: "Uranus",
    note: "System III longitude",
  },
  Neptune: {
    body: Body.Neptune,
    diameterKm: 49_528,
    longitudeConvention: "W",
    label: "Neptune",
    note: "System III longitude",
  },
  Pluto: {
    body: Body.Pluto,
    diameterKm: 2_376.6,
    longitudeConvention: "E",
    label: "Pluto",
  },
};

const CAMERAS = [
  { id: "asi585", name: "ZWO ASI585MC", width: 3840, height: 2160, pixel: 2.9 },
  { id: "asi678", name: "ZWO ASI678MC", width: 3840, height: 2160, pixel: 2.0 },
  { id: "asi462", name: "ZWO ASI462MC", width: 1936, height: 1096, pixel: 2.9 },
  { id: "asi224", name: "ZWO ASI224MC", width: 1304, height: 976, pixel: 3.75 },
  { id: "asi715", name: "ZWO ASI715MC", width: 3864, height: 2192, pixel: 1.45 },
  {
    id: "uranus-c",
    name: "Player One Uranus-C",
    width: 3856,
    height: 2180,
    pixel: 2.9,
  },
  { id: "qhy462", name: "QHY5III462C", width: 1920, height: 1080, pixel: 2.9 },
] as const;

const LOCATIONS = [
  { id: "los-angeles", name: "Los Angeles, USA", lat: 34.0522, lon: -118.2437 },
  { id: "london", name: "London, UK", lat: 51.5074, lon: -0.1278 },
  { id: "tokyo", name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
  { id: "sydney", name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
  { id: "cape-town", name: "Cape Town, South Africa", lat: -33.9249, lon: 18.4241 },
] as const;

type Vec3 = [number, number, number];

function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function magnitude(v: Vec3) {
  return Math.hypot(v[0], v[1], v[2]);
}

function unit(v: Vec3): Vec3 {
  const length = magnitude(v);
  return [v[0] / length, v[1] / length, v[2] / length];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function wrap360(value: number) {
  return ((value % 360) + 360) % 360;
}

function signedAngleDelta(a: number, b: number) {
  return ((a - b + 540) % 360) - 180;
}

function localDateTimeValue(date: Date) {
  const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return shifted.toISOString().slice(0, 16);
}

function initialCaptureTime() {
  const date = new Date();
  date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15, 0, 0);
  return localDateTimeValue(date);
}

function formatFov(degrees: number) {
  const arcminutes = degrees * 60;
  if (arcminutes >= 60) return `${degrees.toFixed(2)}°`;
  if (arcminutes >= 10) return `${arcminutes.toFixed(1)}′`;
  return `${arcminutes.toFixed(2)}′`;
}

function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes) || minutes > 24 * 60) return "24 h+";
  if (minutes < 1) return `${Math.max(1, Math.round(minutes * 60))} sec`;
  if (minutes < 90) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = Math.round(minutes - hours * 60);
  return remaining ? `${hours} h ${remaining} min` : `${hours} h`;
}

function phaseLabel(fraction: number) {
  if (fraction > 0.98) return "Nearly full";
  if (fraction > 0.65) return "Gibbous";
  if (fraction > 0.35) return "Half lit";
  if (fraction > 0.1) return "Crescent";
  return "Thin crescent";
}

function compassDirection(azimuth: number) {
  const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return points[Math.round(azimuth / 45) % 8];
}

function skyQuality(altitude: number) {
  if (altitude >= 45) return { label: "High in the sky", tone: "good" };
  if (altitude >= 20) return { label: "Observable", tone: "good" };
  if (altitude > 0) return { label: "Low altitude", tone: "warn" };
  return { label: "Below horizon", tone: "bad" };
}

function parallacticAngle(
  body: Body,
  date: Date,
  observer: Observer,
  longitude: number,
) {
  const equatorial = Equator(body, date, observer, true, true);
  const hourAngle =
    signedAngleDelta(
      (SiderealTime(date) + longitude / 15 - equatorial.ra) * 15,
      0,
    ) * DEG_TO_RAD;
  const dec = equatorial.dec * DEG_TO_RAD;
  const lat = observer.latitude * DEG_TO_RAD;
  return (
    Math.atan2(
      Math.sin(hourAngle),
      Math.tan(lat) * Math.cos(dec) - Math.sin(dec) * Math.cos(hourAngle),
    ) * RAD_TO_DEG
  );
}

function calculateOrientation(
  planet: PlanetSpec,
  date: Date,
  observer: Observer,
  distanceAu: number,
) {
  const lightDeparture = new Date(
    date.getTime() - distanceAu * LIGHT_SECONDS_PER_AU * 1000,
  );
  const axis = RotationAxis(planet.body, lightDeparture);
  const topocentricJ2000 = Equator(planet.body, date, observer, false, true);
  const towardObserver: Vec3 = [
    -topocentricJ2000.vec.x,
    -topocentricJ2000.vec.y,
    -topocentricJ2000.vec.z,
  ];

  const poleRa = axis.ra * 15 * DEG_TO_RAD;
  const poleDec = axis.dec * DEG_TO_RAD;
  const spin = wrap360(axis.spin) * DEG_TO_RAD;

  const referenceP: Vec3 = [
    Math.cos(poleRa) * Math.sin(poleDec),
    Math.sin(poleRa) * Math.sin(poleDec),
    -Math.cos(poleDec),
  ];
  const referenceQ: Vec3 = [-Math.sin(poleRa), Math.cos(poleRa), 0];
  const pole: Vec3 = [
    Math.cos(poleDec) * Math.cos(poleRa),
    Math.cos(poleDec) * Math.sin(poleRa),
    Math.sin(poleDec),
  ];

  const primeMeridian: Vec3 = [0, 1, 2].map(
    (index) =>
      Math.cos(spin) * referenceQ[index] -
      Math.sin(spin) * referenceP[index],
  ) as Vec3;
  const eastAxis: Vec3 = [0, 1, 2].map(
    (index) =>
      -Math.sin(spin) * referenceQ[index] -
      Math.cos(spin) * referenceP[index],
  ) as Vec3;

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
    Math.asin(dot(towardObserver, pole) / magnitude(towardObserver)) * RAD_TO_DEG;

  const toDate = Rotation_EQJ_EQD(date);
  const targetOfDate = RotateVector(toDate, topocentricJ2000.vec);
  const poleOfDate = RotateVector(toDate, axis.north);
  const lineOfSight = unit([
    targetOfDate.x,
    targetOfDate.y,
    targetOfDate.z,
  ]);
  const celestialPole: Vec3 = [0, 0, 1];
  const northOnSky = unit(
    celestialPole.map(
      (value, index) => value - dot(celestialPole, lineOfSight) * lineOfSight[index],
    ) as Vec3,
  );
  const eastOnSky = unit(cross(celestialPole, lineOfSight));
  const projectedPoleRaw: Vec3 = [
    poleOfDate.x - dot([poleOfDate.x, poleOfDate.y, poleOfDate.z], lineOfSight) * lineOfSight[0],
    poleOfDate.y - dot([poleOfDate.x, poleOfDate.y, poleOfDate.z], lineOfSight) * lineOfSight[1],
    poleOfDate.z - dot([poleOfDate.x, poleOfDate.y, poleOfDate.z], lineOfSight) * lineOfSight[2],
  ];
  const projectedPole = unit(projectedPoleRaw);
  const polePositionAngle = wrap360(
    Math.atan2(dot(projectedPole, eastOnSky), dot(projectedPole, northOnSky)) *
      RAD_TO_DEG,
  );

  return {
    displayLongitude,
    subObserverLatitude,
    polePositionAngle,
    lightTimeMinutes: (distanceAu * LIGHT_SECONDS_PER_AU) / 60,
  };
}

function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}

export default function Home() {
  const [planetKey, setPlanetKey] = useState("Jupiter");
  const [captureTime, setCaptureTime] = useState("");
  const [cameraId, setCameraId] = useState("asi585");
  const [sensorWidth, setSensorWidth] = useState(3840);
  const [sensorHeight, setSensorHeight] = useState(2160);
  const [pixelSize, setPixelSize] = useState(2.9);
  const [focalLength, setFocalLength] = useState(4000);
  const [locationId, setLocationId] = useState("los-angeles");
  const [latitude, setLatitude] = useState(34.0522);
  const [longitude, setLongitude] = useState(-118.2437);
  const [mount, setMount] = useState<"altaz" | "equatorial">("altaz");
  const [locationStatus, setLocationStatus] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setCaptureTime(initialCaptureTime()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const results = useMemo(() => {
    try {
      const planet = PLANETS[planetKey];
      if (!captureTime) return { pending: true as const };
      const date = new Date(captureTime);
      if (!planet || !Number.isFinite(date.getTime())) throw new Error("Choose a valid time.");
      if (
        !Number.isFinite(latitude) ||
        latitude < -90 ||
        latitude > 90 ||
        !Number.isFinite(longitude) ||
        longitude < -180 ||
        longitude > 180
      ) {
        throw new Error("Enter a valid latitude and longitude.");
      }
      if (
        sensorWidth <= 0 ||
        sensorHeight <= 0 ||
        pixelSize <= 0 ||
        focalLength <= 0
      ) {
        throw new Error("Camera and focal length values must be greater than zero.");
      }

      const observer = new Observer(latitude, longitude, 0);
      const equatorial = Equator(planet.body, date, observer, true, true);
      const horizontal = Horizon(
        date,
        observer,
        equatorial.ra,
        equatorial.dec,
        "normal",
      );
      const topocentricJ2000 = Equator(planet.body, date, observer, false, true);
      const illumination = Illumination(planet.body, date);
      const distanceAu = topocentricJ2000.dist;
      const angularDiameterArcsec =
        2 *
        Math.atan(planet.diameterKm / 2 / (distanceAu * AU_KM)) *
        RAD_TO_DEG *
        3600;
      const pixelScaleArcsec =
        2 * Math.atan(pixelSize / 1000 / 2 / focalLength) * RAD_TO_DEG * 3600;
      const diameterPixels = angularDiameterArcsec / pixelScaleArcsec;
      const sensorWidthMm = (sensorWidth * pixelSize) / 1000;
      const sensorHeightMm = (sensorHeight * pixelSize) / 1000;
      const fovWidthDeg =
        2 * Math.atan(sensorWidthMm / 2 / focalLength) * RAD_TO_DEG;
      const fovHeightDeg =
        2 * Math.atan(sensorHeightMm / 2 / focalLength) * RAD_TO_DEG;
      const orientation = calculateOrientation(planet, date, observer, distanceAu);

      const before = new Date(date.getTime() - 30_000);
      const after = new Date(date.getTime() + 30_000);
      const rotationBefore = parallacticAngle(
        planet.body,
        before,
        observer,
        longitude,
      );
      const rotationAfter = parallacticAngle(
        planet.body,
        after,
        observer,
        longitude,
      );
      const rotationRateDegPerMin = Math.abs(
        signedAngleDelta(rotationAfter, rotationBefore),
      );
      const planetRadiusPixels = Math.max(diameterPixels / 2, 0.5);
      const planetToleranceDeg =
        Math.atan(0.5 / planetRadiusPixels) * RAD_TO_DEG;
      const frameRadiusPixels = Math.hypot(sensorWidth, sensorHeight) / 2;
      const frameToleranceDeg = Math.atan(1 / frameRadiusPixels) * RAD_TO_DEG;
      const planetSafeMinutes =
        rotationRateDegPerMin < 0.00001
          ? Number.POSITIVE_INFINITY
          : planetToleranceDeg / rotationRateDegPerMin;
      const frameSafeMinutes =
        rotationRateDegPerMin < 0.00001
          ? Number.POSITIVE_INFINITY
          : frameToleranceDeg / rotationRateDegPerMin;
      const previewPercent = Math.max(
        1.4,
        Math.min(46, (diameterPixels / sensorWidth) * 100),
      );

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
        rotationRateDegPerMin,
        planetSafeMinutes,
        frameSafeMinutes,
        previewPercent,
        previewBoosted: previewPercent > (diameterPixels / sensorWidth) * 100 + 0.01,
        visibility: skyQuality(horizontal.altitude),
        sensorAspect: sensorWidth / sensorHeight,
        ringDiameterPixels:
          planet.body === Body.Saturn ? diameterPixels * 2.26 : undefined,
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Unable to calculate." };
    }
  }, [
    captureTime,
    focalLength,
    latitude,
    longitude,
    pixelSize,
    planetKey,
    sensorHeight,
    sensorWidth,
  ]);

  function chooseCamera(id: string) {
    setCameraId(id);
    const camera = CAMERAS.find((item) => item.id === id);
    if (camera) {
      setSensorWidth(camera.width);
      setSensorHeight(camera.height);
      setPixelSize(camera.pixel);
    }
  }

  function chooseLocation(id: string) {
    setLocationId(id);
    setLocationStatus("");
    const location = LOCATIONS.find((item) => item.id === id);
    if (location) {
      setLatitude(location.lat);
      setLongitude(location.lon);
    }
  }

  function useDeviceLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not available in this browser.");
      return;
    }
    setLocationStatus("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(Number(position.coords.latitude.toFixed(5)));
        setLongitude(Number(position.coords.longitude.toFixed(5)));
        setLocationId("custom");
        setLocationStatus("Device location applied.");
      },
      () => setLocationStatus("Location permission was not granted."),
      { enableHighAccuracy: false, timeout: 10_000 },
    );
  }

  const hasError = "error" in results;
  const isPending = "pending" in results;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Planetary Frame home">
          <span className="brand-mark" aria-hidden="true">
            ◉
          </span>
          <span>Planetary Frame</span>
        </a>
        <span className="header-note">Ephemeris-aware FOV planning</span>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">Planetary imaging calculator</p>
        <h1>Frame the planet you’ll actually see.</h1>
        <p>
          Plan your sensor view, target scale, orientation, and field-rotation
          window for a specific place and moment.
        </p>
      </section>

      <div className="calculator-layout">
        <aside className="control-panel" aria-label="Capture setup">
          <div className="section-heading">
            <span>01</span>
            <div>
              <h2>Target & time</h2>
              <p>Time is interpreted in your device’s local timezone.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              Planet
              <select value={planetKey} onChange={(event) => setPlanetKey(event.target.value)}>
                {Object.entries(PLANETS).map(([key, planet]) => (
                  <option key={key} value={key}>
                    {planet.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Planned capture
              <input
                type="datetime-local"
                value={captureTime}
                onChange={(event) => setCaptureTime(event.target.value)}
              />
            </label>
          </div>

          <div className="divider" />

          <div className="section-heading">
            <span>02</span>
            <div>
              <h2>Camera & optics</h2>
              <p>Pick a camera or enter the active ROI manually.</p>
            </div>
          </div>
          <label>
            Camera model
            <select value={cameraId} onChange={(event) => chooseCamera(event.target.value)}>
              {CAMERAS.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.name}
                </option>
              ))}
              <option value="custom">Manual / custom camera</option>
            </select>
          </label>
          <div className="form-grid three">
            <label>
              Width
              <span className="input-unit">
                <input
                  type="number"
                  min="1"
                  value={sensorWidth}
                  onChange={(event) => {
                    setSensorWidth(Number(event.target.value));
                    setCameraId("custom");
                  }}
                />
                <small>px</small>
              </span>
            </label>
            <label>
              Height
              <span className="input-unit">
                <input
                  type="number"
                  min="1"
                  value={sensorHeight}
                  onChange={(event) => {
                    setSensorHeight(Number(event.target.value));
                    setCameraId("custom");
                  }}
                />
                <small>px</small>
              </span>
            </label>
            <label>
              Pixel size
              <span className="input-unit">
                <input
                  type="number"
                  min="0.1"
                  step="0.01"
                  value={pixelSize}
                  onChange={(event) => {
                    setPixelSize(Number(event.target.value));
                    setCameraId("custom");
                  }}
                />
                <small>µm</small>
              </span>
            </label>
          </div>
          <label>
            Effective focal length
            <span className="input-unit">
              <input
                type="number"
                min="1"
                step="10"
                value={focalLength}
                onChange={(event) => setFocalLength(Number(event.target.value))}
              />
              <small>mm</small>
            </span>
            <em>Include any Barlow or focal extender.</em>
          </label>

          <div className="divider" />

          <div className="section-heading">
            <span>03</span>
            <div>
              <h2>Location & mount</h2>
              <p>Location sets the topocentric sky position and rotation rate.</p>
            </div>
          </div>
          <div className="location-row">
            <label>
              Location
              <select value={locationId} onChange={(event) => chooseLocation(event.target.value)}>
                {LOCATIONS.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
                <option value="custom">Custom coordinates</option>
              </select>
            </label>
            <button className="secondary-button" type="button" onClick={useDeviceLocation}>
              Use my location
            </button>
          </div>
          {locationStatus && (
            <p className="location-status" role="status">
              {locationStatus}
            </p>
          )}
          <div className="form-grid">
            <label>
              Latitude
              <span className="input-unit">
                <input
                  type="number"
                  min="-90"
                  max="90"
                  step="0.0001"
                  value={latitude}
                  onChange={(event) => {
                    setLatitude(Number(event.target.value));
                    setLocationId("custom");
                  }}
                />
                <small>°</small>
              </span>
            </label>
            <label>
              Longitude
              <span className="input-unit">
                <input
                  type="number"
                  min="-180"
                  max="180"
                  step="0.0001"
                  value={longitude}
                  onChange={(event) => {
                    setLongitude(Number(event.target.value));
                    setLocationId("custom");
                  }}
                />
                <small>°</small>
              </span>
              <em>East positive, west negative.</em>
            </label>
          </div>
          <fieldset>
            <legend>Mount type</legend>
            <div className="segmented">
              <label>
                <input
                  type="radio"
                  name="mount"
                  checked={mount === "altaz"}
                  onChange={() => setMount("altaz")}
                />
                <span>Alt-az</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="mount"
                  checked={mount === "equatorial"}
                  onChange={() => setMount("equatorial")}
                />
                <span>Equatorial</span>
              </label>
            </div>
          </fieldset>
        </aside>

        <section className="results-panel" aria-live="polite">
          {isPending ? (
            <div className="error-card pending-card" role="status">
              <span>Preparing your sky</span>
              <p>Setting the capture time from your device…</p>
            </div>
          ) : hasError ? (
            <div className="error-card">
              <span>Check your setup</span>
              <p>{results.error}</p>
            </div>
          ) : (
            <>
              <article className="preview-card">
                <div className="preview-header">
                  <div>
                    <p>{results.planet.label} at capture time</p>
                    <h2>
                      {results.angularDiameterArcsec.toFixed(2)}″ across
                    </h2>
                  </div>
                  <span className={`visibility ${results.visibility.tone}`}>
                    {results.visibility.label}
                  </span>
                </div>
                <div
                  className="sensor-preview"
                  style={
                    {
                      aspectRatio: `${results.sensorAspect}`,
                      "--planet-size": `${results.previewPercent}%`,
                    } as CSSProperties
                  }
                >
                  <span className="direction north">N</span>
                  <span className="direction east">E</span>
                  <div className="crosshair horizontal" />
                  <div className="crosshair vertical" />
                  <div
                    className="planet-stage"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${-results.orientation
                        .polePositionAngle}deg)`,
                    }}
                    aria-label={`${results.planet.label} north pole at ${results.orientation.polePositionAngle.toFixed(
                      1,
                    )} degrees east of celestial north`}
                  >
                    {results.planet.body === Body.Saturn && (
                      <div
                        className="saturn-rings"
                        style={{
                          height: `${Math.max(
                            12,
                            Math.abs(results.illumination.ring_tilt ?? 0) * 3,
                          )}%`,
                        }}
                      />
                    )}
                    <div
                      className="planet-sprite"
                      data-planet={results.planet.label.toLowerCase()}
                    />
                    <div className="pole-line">
                      <span>N</span>
                    </div>
                  </div>
                  <div className="sensor-scale">
                    <span>
                      {formatFov(results.fovWidthDeg)} × {formatFov(results.fovHeightDeg)}
                    </span>
                    <span>
                      {results.previewBoosted ? "Planet enlarged for visibility" : "True relative scale"}
                    </span>
                  </div>
                </div>
              </article>

              <div className="primary-stats">
                <Stat
                  label="Apparent diameter"
                  value={`${results.angularDiameterArcsec.toFixed(2)}″`}
                  note={`at ${results.distanceAu.toFixed(4)} AU`}
                />
                <Stat
                  label="Diameter on sensor"
                  value={`${results.diameterPixels.toFixed(1)} px`}
                  note={
                    results.ringDiameterPixels
                      ? `${results.ringDiameterPixels.toFixed(1)} px with rings`
                      : "equatorial disk"
                  }
                />
                <Stat
                  label="Image scale"
                  value={`${results.pixelScaleArcsec.toFixed(3)}″/px`}
                  note={`${pixelSize} µm at ${focalLength} mm`}
                />
                <Stat
                  label="Sensor FOV"
                  value={`${formatFov(results.fovWidthDeg)} × ${formatFov(
                    results.fovHeightDeg,
                  )}`}
                  note={`${sensorWidth} × ${sensorHeight} px`}
                />
              </div>

              <div className="detail-grid">
                <article className="detail-card">
                  <div className="card-title">
                    <span>Orientation</span>
                    <small>Light-time corrected</small>
                  </div>
                  <dl>
                    <div>
                      <dt>Facing Earth</dt>
                      <dd>
                        {results.orientation.displayLongitude.toFixed(2)}°
                        {results.planet.longitudeConvention},{" "}
                        {Math.abs(results.orientation.subObserverLatitude).toFixed(2)}°
                        {results.orientation.subObserverLatitude >= 0 ? "N" : "S"}
                      </dd>
                    </div>
                    <div>
                      <dt>Sub-Earth latitude</dt>
                      <dd>{results.orientation.subObserverLatitude.toFixed(2)}°</dd>
                    </div>
                    <div>
                      <dt>North pole P.A.</dt>
                      <dd>{results.orientation.polePositionAngle.toFixed(2)}°</dd>
                    </div>
                    <div>
                      <dt>Illuminated</dt>
                      <dd>
                        {(results.illumination.phase_fraction * 100).toFixed(1)}% ·{" "}
                        {phaseLabel(results.illumination.phase_fraction)}
                      </dd>
                    </div>
                    {results.planet.body === Body.Saturn && (
                      <div>
                        <dt>Ring tilt</dt>
                        <dd>{(results.illumination.ring_tilt ?? 0).toFixed(2)}°</dd>
                      </div>
                    )}
                  </dl>
                  <p className="card-footnote">
                    {results.planet.note
                      ? `${results.planet.note}. `
                      : ""}
                    P.A. is measured eastward from celestial north. The visible
                    face accounts for {results.orientation.lightTimeMinutes.toFixed(1)} min
                    of light travel.
                  </p>
                </article>

                <article className="detail-card">
                  <div className="card-title">
                    <span>Sky & tracking</span>
                    <small>{results.date.toISOString().replace(".000", "")}</small>
                  </div>
                  <dl>
                    <div>
                      <dt>Altitude</dt>
                      <dd>{results.altitude.toFixed(1)}°</dd>
                    </div>
                    <div>
                      <dt>Azimuth</dt>
                      <dd>
                        {results.azimuth.toFixed(1)}° {compassDirection(results.azimuth)}
                      </dd>
                    </div>
                    <div>
                      <dt>Earth distance</dt>
                      <dd>
                        {results.distanceAu.toFixed(4)} AU ·{" "}
                        {(results.distanceAu * AU_KM / 1_000_000).toFixed(1)}M km
                      </dd>
                    </div>
                    <div>
                      <dt>Field rotation</dt>
                      <dd>
                        {mount === "altaz"
                          ? `${results.rotationRateDegPerMin.toFixed(3)}°/min`
                          : "Compensated by mount"}
                      </dd>
                    </div>
                  </dl>
                  {mount === "altaz" ? (
                    <div className="tracking-callout">
                      <span>Planet-detail window</span>
                      <strong>{formatDuration(results.planetSafeMinutes)}</strong>
                      <p>
                        Before rotation moves the planet’s limb by 0.5 px. For a
                        strict 1 px limit at the sensor corners:{" "}
                        {formatDuration(results.frameSafeMinutes)}.
                      </p>
                    </div>
                  ) : (
                    <div className="tracking-callout equatorial">
                      <span>Tracking mode</span>
                      <strong>No alt-az field rotation</strong>
                      <p>
                        Assumes a reasonably polar-aligned equatorial mount and
                        normal sidereal tracking.
                      </p>
                    </div>
                  )}
                </article>
              </div>
            </>
          )}
        </section>
      </div>

      <footer>
        <p>
          Planning-grade calculations use{" "}
          <a href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noreferrer">
            Astronomy Engine
          </a>{" "}
          ephemerides and IAU rotational elements. Angular size is recomputed from
          the planet’s distance at the selected time.
        </p>
      </footer>
    </main>
  );
}
