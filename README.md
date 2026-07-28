# Planetary Imaging Calculator

A responsive, static planetary imaging field-of-view calculator. It runs entirely
in the browser and is ready for GitHub Pages.

Features include:

- Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, and Neptune
- date-, time-, distance-, and location-aware angular size and visibility
- searchable local catalogs with 379 camera and 929 telescope presets, plus
  fully editable sensor and focal-length values
- separate telescope focal length and Barlow/reducer multiplier controls
- a ±7-day time scrubber with one-hour step buttons and smooth elapsed-time
  playback rates from one simulated minute to six simulated hours per second
- hemisphere-, location-, time-, and mount-aware frame orientation: alt-az
  previews follow the local vertical while equatorial previews follow celestial
  north
- manual camera rotation offset with the planet, phase, rings, and Galilean
  moons transformed together into sensor coordinates
- calculated effective focal length, image scale, FOV, and planet diameter in pixels
- light-time-corrected central longitude, sub-Earth latitude, pole position angle,
  and illuminated phase
- predicted phases for every applicable target, including the Moon, Mercury,
  and Venus
- orthographic 3D map projection for the calculated Earth-facing side of the
  Moon, Sun, Mercury, Mars, Jupiter, Saturn, Uranus, and Neptune
- light-time-corrected positions for major moons of Mars, Jupiter, Saturn,
  Uranus, and Neptune, with true-scale preview placement
- collision-managed moon labels that retain a constant visual size, plus
  independent preview switches for moon markers and labels
- Galilean moon transits and the next predicted Jupiter moon transit
- alt-az field-rotation rate and conservative imaging windows
- a responsive, Stellarium-inspired sky-atlas interface
- a screenshot-inspired equipment-first layout with a large sensor-frame view
- a distraction-free black FOV workspace with a single sensor rectangle
- a procedural phase-aware cloud sphere for Venus, whose visible cloud deck is
  broadly uniform
- a layered Saturn model with a Hubble-mapped globe and a separate
  3072-pixel Cassini-derived ring texture rendered in front of and behind the
  planet
- locally bundled, credited NASA/USGS mission imagery and global maps
